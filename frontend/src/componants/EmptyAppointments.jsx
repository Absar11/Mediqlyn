
import React from "react";
import Lottie from "lottie-react";

const EmptyAppointments = () => {
    return (
        <div className="flex flex-col items-center justify-center py-10 text-center text-gray-600">
            <div className="w-64 md:w-80">
                <Lottie
                    animationData={require('lottie-web/build/player/lottie_light')}
                    path="https://assets9.lottiefiles.com/packages/lf20_iwmd6pyr.json"
                    loop
                    autoplay
                />
            </div>
            <p className="text-lg mt-4">No Appointments Found</p>
            <p className="text-sm text-gray-500">Looks like you haven't booked any appointments yet.</p>
        </div>
    );
};

export default EmptyAppointments;
