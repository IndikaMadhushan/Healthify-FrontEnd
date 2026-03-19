import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { IoLogOutSharp } from "react-icons/io5";
import { 
  getPendingDoctorsApi, 
  approveDoctorApi,
  rejectDoctorApi,
  getDoctorByIdApi, 
  getPatientByIdApi,
  toggleDoctorStatusApi,
  togglePatientStatusApi,
  getAdminProfileApi
} from '../api/AdminApi';
import {
  approveSiteReviewApi,
  getPendingSiteReviewsApi,
  rejectSiteReviewApi,
} from "../api/SiteReviewApi";
import { getDisplayName } from '../utils/nameUtils';
import { confirmLogout } from '../utils/logoutConfirmation';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [_SEARCH_TYPE] = useState('doctorId');
  const [_PATIENT_SEARCH_TYPE] = useState('patientId');

  // Data states
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [pendingSiteReviews, setPendingSiteReviews] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const [adminProfile, setAdminProfile] = useState({ id: 'ADMIN', email: '', name: 'Admin' });
  const [adminLoading, setAdminLoading] = useState(true);
  // Loading states
  const [loading, setLoading] = useState(false);
  const [pendingLoading, setPendingLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    // Fetch pending doctors on mount
    fetchPendingDoctors();
    fetchAdminProfile();
    fetchPendingReviews();
  }, []);

  const fetchAdminProfile = async () => {
    try {
      setAdminLoading(true);
      const data = await getAdminProfileApi();
      setAdminProfile({
        id: data?.id || 'ADMIN',
        email: data?.email || '',
        name: data?.name || 'Admin'
      });
    } catch (error) {
      console.error('Error fetching admin profile:', error);
      toast.error('Failed to load admin profile');
    } finally {
      setAdminLoading(false);
    }
  };


  const fetchPendingDoctors = async () => {
    try {
      setPendingLoading(true);
      const data = await getPendingDoctorsApi();
      setPendingDoctors(data);
    } catch (error) {
      console.error('Error fetching pending doctors:', error);
      setError('Failed to load pending doctors');
    } finally {
      setPendingLoading(false);
    }
  };

  const fetchPendingReviews = async () => {
    try {
      setReviewLoading(true);
      const data = await getPendingSiteReviewsApi();
      setPendingSiteReviews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching pending site reviews:', error);
      toast.error('Failed to load pending site reviews');
    } finally {
      setReviewLoading(false);
    }
  };

  const handleDoctorSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search value');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const data = await getDoctorByIdApi(searchQuery);
      setSelectedDoctor(data);
      setShowDoctorModal(true);
    } catch (error) {
      console.error('Error searching doctor:', error);
      const message = error.response?.data?.message || 'Doctor not found';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handlePatientSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search value');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const data = await getPatientByIdApi(searchQuery);
      setPatientData(data);
      setShowPatientModal(true);
    } catch (error) {
      console.error('Error searching patient:', error);
      const message = error.response?.data?.message || 'Patient not found';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveDoctor = async (userId) => {
    try {
      setLoading(true);
      await approveDoctorApi(userId);
      toast.success('Doctor approved successfully! Activation email has been sent.');
      
      await fetchPendingDoctors();
    } catch (error) {
      console.error('Error approving doctor:', error);
      const message = error.response?.data?.message || 'Failed to approve doctor';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRejectDoctor = async (userId) => {
    if (!confirm('Are you sure you want to reject this doctor registration? This will permanently delete the account.')) {
      return;
    }

    try {
      setLoading(true);
      await rejectDoctorApi(userId);
      toast.success('Doctor registration rejected successfully.');
      
      await fetchPendingDoctors();
    } catch (error) {
      console.error('Error rejecting doctor:', error);
      const message = error.response?.data?.message || 'Failed to reject doctor';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveSiteReview = async (reviewId) => {
    try {
      setLoading(true);
      await approveSiteReviewApi(reviewId);
      toast.success("Review approved successfully.");
      await fetchPendingReviews();
    } catch (error) {
      console.error('Error approving site review:', error);
      const message = error.response?.data?.message || 'Failed to approve review';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRejectSiteReview = async (reviewId) => {
    try {
      setLoading(true);
      await rejectSiteReviewApi(reviewId);
      toast.success("Review rejected successfully.");
      await fetchPendingReviews();
    } catch (error) {
      console.error('Error rejecting site review:', error);
      const message = error.response?.data?.message || 'Failed to reject review';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleDoctorStatus = async (doctorId, currentStatus) => {
    const action = currentStatus === 'ACTIVE' ? 'disable' : 'activate';
    
    if (!confirm(`Are you sure you want to ${action} this doctor's account?`)) {
      return;
    }

    try {
      setLoading(true);
      await toggleDoctorStatusApi(doctorId);
      toast.success(`Doctor account ${action}d successfully!`);
      
      const updatedDoctor = await getDoctorByIdApi(doctorId);
      setSelectedDoctor(updatedDoctor);
    } catch (error) {
      console.error('Error toggling doctor status:', error);
      const message = error.response?.data?.message || `Failed to ${action} doctor account`;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePatientStatus = async (patientId, currentStatus) => {
    const action = currentStatus === 'ACTIVE' ? 'disable' : 'activate';
    
    if (!confirm(`Are you sure you want to ${action} this patient's account?`)) {
      return;
    }

    try {
      setLoading(true);
      await togglePatientStatusApi(patientId);
      toast.success(`Patient account ${action}d successfully!`);
      
      const updatedPatient = await getPatientByIdApi(patientId);
      setPatientData(updatedPatient);
    } catch (error) {
      console.error('Error toggling patient status:', error);
      const message = error.response?.data?.message || `Failed to ${action} patient account`;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (confirmLogout()) {
      console.log('Admin logged out');
      navigate('/login', { replace: true });
    }
  };

  const pendingActionCount = pendingDoctors.length + pendingSiteReviews.length;

  return (
    <div className="min-h-screen bg-[#F2FBFA]">
      {/* Header */}
      <div className="bg-white border-b border-[#D3F0ED] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#0F4F52]">
                {greeting}, {adminProfile.name || 'Admin'}! 👋
              </h1>
              <div className="mt-2 space-y-1">
                
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-[#18AAB0]">Email:</span>{' '}
                  {adminLoading ? 'Loading...' : (adminProfile.email || '—')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center sm:gap-3 justify-between sm:justify-end w-full ">
              <button
                onClick={() => setActiveTab('pending')}
                className="relative p-3 bg-[#18AAB0] text-white rounded-full hover:bg-[#86C443] transition-colors"
              >
                <span className="text-xl">🔔</span>
                {pendingActionCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {pendingActionCount}
                  </span>
                )}
              </button>

              <button
                onClick={handleLogout}
                className="px-5 py-2.5 bg-red-50 text-red-600 border-2 border-red-200 rounded-full font-semibold hover:bg-red-100 transition-all flex items-center gap-2"
              >
                <span><IoLogOutSharp className='text-red-600 text-xl '/></span>
                <span className="">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Tabs */}
        <div className="flex  sm:flex-row flex-wrap gap-2 mb-8">
          <TabButton
            active={activeTab === 'pending'}
            onClick={() => setActiveTab('pending')}
            badge={pendingDoctors.length}
          >
            📋 Pending Approvals
          </TabButton>
          <TabButton
            active={activeTab === 'reviews'}
            onClick={() => setActiveTab('reviews')}
            badge={pendingSiteReviews.length}
          >
            ⭐Pending Reviews
          </TabButton>
          <TabButton
            active={activeTab === 'doctors'}
            onClick={() => setActiveTab('doctors')}
          >
            👨‍⚕️ Search Doctors
          </TabButton>
          <TabButton
            active={activeTab === 'patients'}
            onClick={() => setActiveTab('patients')}
          >
            👤 Search Patients
          </TabButton>
        </div>

        {pendingLoading && activeTab === 'pending' && (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#D3F0ED]">
            <div className="inline-block w-8 h-8 border-4 border-[#18AAB0] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 mt-4">Loading pending doctors...</p>
          </div>
        )}

        {reviewLoading && activeTab === 'reviews' && (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#D3F0ED]">
            <div className="inline-block w-8 h-8 border-4 border-[#18AAB0] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 mt-4">Loading pending reviews...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-4">
            <p className="text-red-600 text-sm">❌ {error}</p>
          </div>
        )}

        {!pendingLoading && activeTab === 'pending' && (
          <PendingApprovalsSection
            doctors={pendingDoctors}
            onApprove={handleApproveDoctor}
            onReject={handleRejectDoctor}
            loading={loading}
          />
        )}

        {!reviewLoading && activeTab === 'reviews' && (
          <PendingSiteReviewsSection
            reviews={pendingSiteReviews}
            onApprove={handleApproveSiteReview}
            onReject={handleRejectSiteReview}
            loading={loading}
          />
        )}

        {activeTab === 'doctors' && (
          <DoctorSearchSection
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchType={_SEARCH_TYPE}
            onSearch={handleDoctorSearch}
            loading={loading}
          />
        )}

        {activeTab === 'patients' && (
          <PatientSearchSection
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchType={_PATIENT_SEARCH_TYPE}
            onSearch={handlePatientSearch}
            loading={loading}
          />
        )}
      </div>

      {/* Doctor Details Modal */}
      {showDoctorModal && selectedDoctor && (
        <DoctorDetailsModal
          doctor={selectedDoctor}
          onClose={() => setShowDoctorModal(false)}
          onToggleStatus={handleToggleDoctorStatus}
        />
      )}

      {/* Patient Existence Modal */}
      {showPatientModal && patientData && (
        <PatientExistenceModal
          patient={patientData}
          onClose={() => {
            setShowPatientModal(false);
            setPatientData(null);
          }}
          onToggleStatus={handleTogglePatientStatus}
        />
      )}
    </div>
  );
}


// Tab Button Component
function TabButton({ active, onClick, children, badge }) {
  return (
    <button
      onClick={onClick}
      className={`relative sm:w-[200px] w-[180px] py-3 rounded-xl font-semibold sm:text-[16px] text-sm transition-all ${
        active
          ? 'bg-gradient-to-r from-[#18AAB0] to-[#86C443] text-white shadow-lg'
          : 'bg-white text-gray-600 hover:bg-[#F7FCFB] border border-[#D3F0ED]'
      }`}
    >
      {children}
      {badge > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
}

// Pending Approvals Section
function PendingApprovalsSection({ doctors, onApprove, onReject, loading }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-[#0F4F52] mb-4">
        Pending Doctor Registrations
      </h2>
      
      {doctors.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#D3F0ED]">
          <span className="text-6xl">✅</span>
          <p className="text-gray-500 mt-4">No pending approvals</p>
        </div>
      ) : (
        doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-2xl p-6 border border-[#D3F0ED] shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col gap-6">
              {/* Doctor Info */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#0F4F52]">
                    {getDisplayName(doctor)}
                  </h3>
                  <p className="text-sm text-[#18AAB0] font-medium">{doctor.specialization || 'N/A'}</p>
                </div>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                  Pending
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <InfoItem label="User ID" value={doctor.doctorId} />
                <InfoItem label="SLMC Number" value={doctor.licenseNumber || 'N/A'} />
                <InfoItem label="NIC" value={doctor.nic || 'N/A'} />
                <InfoItem label="Email" value={doctor.email} />
                <InfoItem label="Hospital" value={doctor.hospital || 'N/A'} />
                <InfoItem label="Role" value={doctor.role} />
              </div>

              {/* Document Actions */}
              {doctor.verificationDocUrl ? (
                <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
                  <a
                    href={doctor.verificationDocUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                  >
                    <span>👁️</span>
                    <span>View Verification Document</span>
                  </a>
                  <a
                    href={doctor.verificationDocUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                  >
                    <span>📄</span>
                    <span>Open Document</span>
                  </a>
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <p className="text-sm text-gray-500">No verification document</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => onApprove(doctor.id)}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#18AAB0] to-[#86C443] text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : '✓ Approve & Activate'}
                </button>
                <button
                  onClick={() => onReject(doctor.id)}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-red-50 text-red-600 border-2 border-red-200 rounded-xl font-semibold hover:bg-red-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ✗ Reject
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function PendingSiteReviewsSection({ reviews, onApprove, onReject, loading = false }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-[#0F4F52] mb-4">
        Pending Site Reviews
      </h2>

      {reviews.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#D3F0ED]">
          <span className="text-6xl">⭐</span>
          <p className="text-gray-500 mt-4">No pending reviews</p>
        </div>
      ) : (
        reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-2xl p-6 border border-[#D3F0ED] shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col gap-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  {review.patientPhotoUrl ? (
                    <img
                      src={review.patientPhotoUrl}
                      alt={review.patientName}
                      className="w-14 h-14 rounded-full object-cover border border-[#D3F0ED]"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-[#EAF7F6] text-[#18AAB0] font-semibold flex items-center justify-center border border-[#D3F0ED]">
                      {review.patientName?.charAt(0)?.toUpperCase() || "P"}
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-[#0F4F52]">
                      {review.patientName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {review.patientEmail || review.patientId}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                  Pending
                </span>
              </div>

              <div className="flex flex-wrap gap-6 text-sm">
                <InfoItem label="Patient ID" value={review.patientId} />
                <InfoItem
                  label="Submitted"
                  value={new Date(review.createdAt).toLocaleString()}
                />
                <div>
                  <span className="text-gray-500 text-xs block mb-1">
                    Rating
                  </span>
                  <ReviewStars rating={review.rating} />
                </div>
              </div>

              <div className="bg-[#F7FCFB] border border-[#D3F0ED] rounded-xl p-4">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {review.review}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => onApprove(review.id)}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#18AAB0] to-[#86C443] text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Approve Review
                </button>
                <button
                  onClick={() => onReject(review.id)}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-red-50 text-red-600 border-2 border-red-200 rounded-xl font-semibold hover:bg-red-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reject Review
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// Doctor Search Section
function DoctorSearchSection({ searchQuery, setSearchQuery, onSearch, loading }) {
  return (
    <div className="bg-white rounded-2xl p-6 lg:p-8 border border-[#D3F0ED]">
      <h2 className="text-xl font-semibold text-[#0F4F52] mb-6">Search Doctor</h2>
      
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
          <p className="text-sm text-blue-800">
            ℹ️ Currently only Doctor ID search is supported by the backend
          </p>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter Doctor ID"
            className="flex-1 px-4 py-3 border-2 border-[#D3F0ED] rounded-xl focus:border-[#18AAB0] focus:ring-4 focus:ring-[#18AAB0]/20 outline-none transition-all"
            onKeyPress={(e) => e.key === 'Enter' && onSearch()}
          />
          <button
            onClick={onSearch}
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-[#18AAB0] to-[#86C443] text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hidden sm:block"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Searching...
              </span>
            ) : (
              '🔍 Search'
            )}
          </button>
          <button
            onClick={onSearch}
            disabled={loading}
            className="px-4 py-4 bg-gradient-to-r from-[#18AAB0] to-[#86C443] text-white rounded-full font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed sm:hidden block"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Searching...
              </span>
            ) : (
              '🔍'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Patient Search Section
function PatientSearchSection({ searchQuery, setSearchQuery, onSearch, loading }) {
  return (
    <div className="bg-white rounded-2xl p-6 lg:p-8 border border-[#D3F0ED]">
      <h2 className="text-xl font-semibold text-[#0F4F52] mb-6">Search Patient</h2>
      
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-amber-800">
          ⚠️ <strong>Privacy Notice:</strong> You can only check patient existence and manage account status. 
          Patient details are protected and not visible to admin.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
          <p className="text-sm text-blue-800">
            ℹ️ Currently only Patient ID search is supported by the backend
          </p>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter Patient ID"
            className="flex-1 px-4 py-3 border-2 border-[#D3F0ED] rounded-xl focus:border-[#18AAB0] focus:ring-4 focus:ring-[#18AAB0]/20 outline-none transition-all"
            onKeyPress={(e) => e.key === 'Enter' && onSearch()}
          />
          <button
            onClick={onSearch}
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-[#18AAB0] to-[#86C443] text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed  hidden sm:block"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Checking...
              </span>
            ) : (
              '🔍 Check'
            )}
          </button>
          <button
            onClick={onSearch}
            disabled={loading}
            className="px-4 py-4 bg-gradient-to-r from-[#18AAB0] to-[#86C443] text-white rounded-full font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed  block sm:hidden"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Checking...
              </span>
            ) : (
              '🔍 '
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Info Item Component
function InfoItem({ label, value }) {
  return (
    <div>
      <span className="text-gray-500 text-xs block mb-1">{label}</span>
      <span className="text-[#0F4F52] font-medium block truncate">{value}</span>
    </div>
  );
}

function ReviewStars({ rating }) {
  return (
    <div className="flex items-center gap-1 text-amber-400">
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={`review-star-${rating}-${index}`}
          className={index < rating ? "opacity-100" : "opacity-25"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

// Doctor Details Modal
function DoctorDetailsModal({ doctor, onClose, onToggleStatus }) {
  const isEnabled = doctor.user?.enabled ?? doctor.enabled ?? true;
  const accountStatus = isEnabled ? 'ACTIVE' : 'DISABLED';
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-6 lg:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-[#0F4F52]">Doctor Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <DetailRow label="Name" value={getDisplayName(doctor)} />
          <DetailRow label="Doctor ID" value={doctor.doctorId} />
          <DetailRow label="License Number" value={doctor.licenseNumber || 'N/A'} />
          <DetailRow label="NIC" value={doctor.nic || 'N/A'} />
          <DetailRow label="Email" value={doctor.email} />
          <DetailRow label="Phone" value={doctor.phone || 'N/A'} />
          <DetailRow label="Specialization" value={doctor.specialization || 'N/A'} />
          <DetailRow label="Hospital" value={doctor.hospital || 'N/A'} />
          <DetailRow label="Age" value={doctor.age || 'N/A'} />
          <DetailRow 
            label="Account Status" 
            value={
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                isEnabled 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {isEnabled ? '✓ Active' : '✗ Disabled'}
              </span>
            }
          />

          {doctor.verificationDocUrl ? (
            <div className="pt-4 border-t">
              <a
                href={doctor.verificationDocUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-3 bg-blue-50 text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <span>📄</span>
                <span>View Verification Document</span>
              </a>
            </div>
          ) : (
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-500">No verification document</p>
            </div>
          )}
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={() => onToggleStatus(doctor.doctorId, accountStatus)}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
              isEnabled
                ? 'bg-red-50 text-red-600 border-2 border-red-200 hover:bg-red-100'
                : 'bg-gradient-to-r from-[#18AAB0] to-[#86C443] text-white hover:shadow-lg'
            }`}
          >
            {isEnabled ? '🔒 Disable Account' : '✓ Activate Account'}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// Patient Existence Modal
function PatientExistenceModal({ patient, onClose, onToggleStatus }) {
  const patientExists = patient && patient.patientId;
  const isEnabled = patient?.user?.enabled ?? patient?.enabled ?? true;
  const accountStatus = isEnabled ? 'ACTIVE' : 'DISABLED';
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-6 lg:p-8 max-w-md w-full">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-[#0F4F52]">Patient Search Result</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {patientExists ? (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <span className="text-4xl">✓</span>
              <p className="text-green-700 font-semibold mt-2">Patient Found</p>
            </div>

            <DetailRow label="Patient ID" value={patient.patientId} />
            <DetailRow label="Email" value={patient.email} />
            <DetailRow label="Phone" value={patient.phone || 'N/A'} />
            
            {patient.registrationDate && (
              <DetailRow label="Registered Date" value={new Date(patient.registrationDate).toLocaleDateString()} />
            )}

            <DetailRow 
              label="Account Status" 
              value={
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  isEnabled 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {isEnabled ? '✓ Active' : '✗ Disabled'}
                </span>
              }
            />

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mt-4">
              <p className="text-xs text-amber-800">
                🔒 Full patient details are protected for privacy reasons. Only basic info is shown.
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => onToggleStatus(patient.patientId, accountStatus)}
                className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
                  isEnabled
                    ? 'bg-red-50 text-red-600 border-2 border-red-200 hover:bg-red-100'
                    : 'bg-gradient-to-r from-[#18AAB0] to-[#86C443] text-white hover:shadow-lg'
                }`}
              >
                {isEnabled ? 'Disable Account' : 'Activate Account'}
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 border-2 border-gray-200 rounded-xl font-semibold hover:bg-gray-200 transition-all"
              >
                ✕ Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <span className="text-6xl">❌</span>
            <p className="text-gray-600 mt-4">Patient not found</p>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full mt-6 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
}

// Detail Row Component
function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-100">
      <span className="text-gray-600 font-medium">{label}</span>
      <span className="text-[#0F4F52] font-semibold">{typeof value === 'string' ? value : value}</span>
    </div>
  );
}
