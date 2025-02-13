import PropTypes from 'prop-types';
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-center items-center mt-4">
            <ul className="inline-flex items-center space-x-1 rtl:space-x-reverse m-auto mb-4">
                <li>
                    <button
                        type="button"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex justify-center font-semibold px-3.5 py-2 rounded transition bg-white-light text-dark hover:text-white hover:bg-dark dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
                    >
                        &lt;
                    </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                    <li key={index + 1}>
                        <button
                            type="button"
                            onClick={() => onPageChange(index + 1)}
                            className={`flex justify-center font-semibold px-3.5 py-2 rounded transition ${
                                currentPage === index + 1
                                    ? 'bg-dark text-white dark:bg-dark dark:text-white-light'
                                    : 'bg-white-light text-dark hover:text-white hover:bg-dark dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-dark'
                            }`}
                        >
                            {index + 1}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        type="button"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex justify-center font-semibold px-3.5 py-2 rounded transition bg-white-light text-dark hover:text-white hover:bg-dark dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
                    >
                        &gt;
                    </button>
                </li>
            </ul>
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
