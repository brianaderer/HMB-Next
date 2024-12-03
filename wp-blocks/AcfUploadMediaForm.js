import { gql, useQuery } from '@apollo/client';
import React, {useEffect, useState,  useContext} from 'react';
import {AuthContext} from "../contexts";
import {
    Form,
    Login,
    Galleries,
} from "../components";

export default function AcfUploadMediaForm(props) {
    const authData = useContext( AuthContext );
    const {dbUser} = authData;
    const [ids, setIds] = useState([]);
    const [images, setImages] = useState([]);
    const submitter = async props => {
        return await fetch("/api/updateUserInfo", {
            method: "POST",
            body: JSON.stringify(props),
            headers: {
                "Content-Type": "application/json",
            },
        });
    };
    useEffect(() => {
        if( dbUser && dbUser['image-gallery'] ){
            setIds( dbUser['image-gallery'] );
        }
    }, [dbUser]);

    const {loading, error, data: queryData} = useQuery(AcfUploadMediaForm.MediaQuery, {
        variables: {ids: ids},
    });


    useEffect(() => {
        if( queryData ){
            setImages( queryData.mediaQuery );
        }
    }, [queryData]);

    const data = props.mediaData;
    const fieldsData = JSON.parse(data);
    const headline = 'Manage Your Media';
    const message = 'Please Log In to Edit Your Information';
    const id = 'signUp';

    return (
        <Login id={id} message={message}>
            <Galleries.MasonryComponent posts={images} increment={10} srcName={'permalink'} captionName={'caption'} cols={5} spacing={3}  />
            <Form fieldsData={fieldsData} submitter={submitter} headline={headline}/>
        </Login>
    );
}

// Define the GraphQL query
AcfUploadMediaForm.MediaQuery = gql`
  query MediaQuery($ids: [Int]) {
    mediaQuery(ids: $ids) {
      caption
      alt
      id
      permalink
      size
      timestamp
      title
    }
  }
`;


AcfUploadMediaForm.fragments = {
    entry: gql`
    fragment AcfUploadMediaFormFragment on AcfUploadMediaForm {
      mediaData
    }
  `,
    key: `AcfUploadMediaFormFragment`,
};

AcfUploadMediaForm.displayName = 'AcfUploadMediaForm';