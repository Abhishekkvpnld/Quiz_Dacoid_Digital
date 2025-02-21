const InstructionCard = ({ instructions = [] }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto mt-2">
            <h2 className="text-xl font-semibold text-red-700 mb-4">Quiz Instructions</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                {instructions.map((instruction, index) => (
                    <li key={index} className="border-l-4 text-sm border-blue-500 pl-3">
                        {instruction}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InstructionCard;
