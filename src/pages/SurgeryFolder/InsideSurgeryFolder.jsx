import React from 'react'
import CustomizeFolder from '../RepoteManagePages/CustomizeFolderPage'
import SurgeryCardFolder from './SurgeryCardFolder'
import { PatinetNavBar } from '../../components/PatientNavBar'
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default  function InsideSurgeryFolder() {
      const navigate = useNavigate();
  return (
  <>
        <PatinetNavBar/>
        <div className="min-h-screen bg-gray-50 p-6">
            
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-6">
            <button
            onClick={() => navigate("/medical-reports/surgeries")}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition mb-3"
            >
            <ArrowLeft size={18} />
            Back to Surgery Folder
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="lg:text-2xl text-xl font-bold text-secondary">
                Surgery Reports
                </h1>
                <p className="text-gray-500 mt-1">
                Manage Your All Surgery Reports Seperatly
                </p>
            </div>
            </div>
        </div>

        {/* Content Card */}
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-md border border-gray-200 p-6">
            <SurgeryCardFolder/>
        </div>
        </div>
    </>
  )
}

