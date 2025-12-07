

import Header from "../HomePage/Header";
import Uploader from "./reportUploadComponent";

export default function VaccinePage() {
        return(
            <>
                
                <div className="max-w-4xl mx-auto p-4 font-bold text-mainblack text-xl">
                    <h1>Vaccines</h1>
                </div>

                <div>
                        <Uploader title="Upload a New Vaccine Report"/>
                </div>
            </>
        )
}