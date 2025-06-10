type SaveButtonProps = {
    handleSave: () => void;
    selectedItemState: any[];
}

const SaveButton = ({handleSave, selectedItemState}: SaveButtonProps) => {
    return (
        <button
            onClick={handleSave}
            className="hover:bg-gray-700 bg-gray-800 text-white px-6 py-3 rounded"
        >
            {selectedItemState.length > 0 ? 'Next' : 'Skip'}
        </button>
    )
}

export default SaveButton
