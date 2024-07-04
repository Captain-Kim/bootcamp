import Image from "next/image";

const LoadingSpinner = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <Image
                src="/pokemon_ball.gif"
                alt="Loading"
                width={50}
                height={50}
                className="animate-bounceY"
            />
            <p className="text-2xl font-bold mt-4 animate-bounceY">잠시만 기다려주세요.</p>
        </div>
    );
};

export default LoadingSpinner;