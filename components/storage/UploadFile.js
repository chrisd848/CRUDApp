import { useRef, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/storage'
import fire from '../../config/fire-config';

const UploadFile = () => {
    const inputEl = useRef(null)
    const [value, setValue] = useState(0)

    function uploadFile() {
        var file = inputEl.current.files[0]

        var storageRef = fire.storage().ref('user_uploads/' + file.name)

        var task = storageRef.put(file)

        task.on('state_change',

            function progress(snapshot) {
                setValue((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            },

            function error(err) {
                alert(error)
            },

            function complete() {
                alert('Uploaded to firebase storage successfully!')
            }
        )
    }

    return (
        <>
            <progress value={value} max="100"></progress>
            <input
                type="file"
                onChange={uploadFile}
                ref={inputEl}
            />
        </>
    )
}

export default UploadFile