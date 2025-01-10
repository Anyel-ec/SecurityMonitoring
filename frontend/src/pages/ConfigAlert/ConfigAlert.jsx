import React, { useState, useRef, useEffect } from 'react';

const ConfigAlert = () => {

    return (
        <div>
            <div className="grid grid-cols-1 gap-5 mb-5">
                <div className="panel lg:col-span-2 xl:col-span-3">
                    <div className='className="table-responsive text-[#515365] dark:text-white-light font-semibold"'>
                        <form onSubmit={() => { }} className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 bg-white dark:bg-black">
                            <h6 className="text-lg font-bold mb-5">Configuración de alertas</h6>
                            <div className="flex flex-col sm:flex-row">
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-5">

                                    <div>
                                        Postgre
                                    </div>

                                    <div>
                                        Maria
                                    </div>

                                    <div>
                                        Mongo
                                    </div>

                                    <div className="sm:col-span-3 mt-3">
                                        <button type="submit" className="btn btn-primary">
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfigAlert;
