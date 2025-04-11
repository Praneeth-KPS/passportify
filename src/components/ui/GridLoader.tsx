
const GridLoader = () => {
    return (
        <div className="grid grid-cols-3 grid-rows-2 gap-2 w-[600px] h-[300px]">
            {[...Array(6)].map((_, i) => (
                <div
                    key = {i}
                    className="bg-gray-300 animate-pulse rounded-md" />
            ))}
        </div>
    );
};

export default GridLoader;
