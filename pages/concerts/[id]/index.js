import { useRouter } from "next/router";
import { collection, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase";

export async function getServerSideProps(router) {
    const idObj = router.query;
    const { id } = idObj;

    return{
        props: {
            id
        }
    }
}

function SpecificConcert({id}) {
    const [concertData, setConcertData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        onSnapshot(doc(db, "concerts", id), (doc) => {
            setConcertData(doc.data());
        });
    }, []);

    
    return (
        <>
            <h1>Title : {concertData.title} </h1>
            <h1>Price : {concertData.price}</h1>
        </>
    );
}

export default SpecificConcert
