function LoadingOverlay() {
    return (
        <div className="absolute inset-0 w-full h-screen grid place-items-center">
            <span className="loading loading-spinner loading-lg text-secondary"></span>
        </div>
    )
}

export default LoadingOverlay
