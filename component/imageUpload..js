import Image from 'next/image';
import React, { useEffect, useState } from 'react'

function ImageUpload() {

    const [image, setImage] = useState("");
    const [allImage, setAllImage] = useState([]);

    function covertToBase64(e) {
        console.log(e);
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result); //base64encoded string  
            setImage(reader.result);
        };
        reader.onerror = error => {
            console.log("Error: ", error);
        };
    }
    useEffect(()=>{
        getImage()
    },[])

    function uploadImage() {
        fetch(`https://krantieducation.onrender.com/upload-image`, {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                base64: image
            })
        }).then((res) => res.json()).then((data) => console.log(data))
    }
    function getImage() {
        fetch(`https://krantieducation.onrender.com/get-image`, {
            method: "GET",
        }).then((res) => res.json()).then((data) => {
            console.log(data)
            setAllImage(data.data)
        })
    }
    return (
        <div className="auth-wrapper" >
            <div className="auth-inner" style={{ width: "auto" }}>
                Lets Upload Image<br />
                <input
                    accept="image/*"
                    type="file"
                    onChange={covertToBase64}
                />
                {image == "" || image == null ? "" : <Image width={100} height={100} alt="" src={image} />}
                <button onClick={uploadImage}>Upload</button>
<br/>
                {allImage.map(data=>{
                    return(
                        <Image key={index} width={100} height={100} alt="" src={data.image} />
                        
                    )
                })}

            </div>

        </div>
    )
}

export default ImageUpload;