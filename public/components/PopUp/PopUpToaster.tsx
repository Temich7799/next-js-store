import React from "react"
import { Toaster } from "react-hot-toast"

const PopUpToaster = () => {
    return (
        <Toaster
            position="top-right"

            toastOptions={{
                style: {
                    padding: '5px',
                    fontFamily: 'Montserrat',
                    fontSize: '12px',
                    borderRadius: '5px',
                    border: 'none',
                    backgroundColor: 'white',
                    boxShadow: '0px 0px 12px -2px rgba(0,0,0,0.25)'
                },
            }}
        />
    )
}

export default PopUpToaster;