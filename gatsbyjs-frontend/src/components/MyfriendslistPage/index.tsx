import React, { useState, useEffect } from 'react';
import Card from '../UserslistPage/Card';
//REACT-HELMET
import Head from '../Head';
//REDUX-TOOLKIT
import { useSelector } from 'react-redux';
import { selectDark } from '../../toolkit/darkSlice';
import { selectHoldIdOfUserUntilSignedIn } from '../../toolkit/holdIdOfUserUntilSignedInSlice';
//REACT-BOOTSTRAP
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
//LOADER
import Loader from '../_animatedLoader/Loader';
//PAGE404
import Page404 from '../_animatedPage404/Page404';
//APPSYNC-QUERIES
import { fetchAllUserfriends } from '../../appsync_functions/queries';
//APPSYNC-SUBSCRIPTIONS
import { subscribeOnUserfriend } from '../../appsync_functions/subscriptions';


function MyfriendslistPage() {
    const dark = useSelector(selectDark);
    const holdIdOfUserUntilSignedIn = useSelector(selectHoldIdOfUserUntilSignedIn);


    //fetching data from APPSYNC
    const [ allUserfriends, setAllUserfriends ] = useState<any>(false);
    useEffect(() => {
        const fetchFunction = async() => {
            setAllUserfriends(await fetchAllUserfriends(holdIdOfUserUntilSignedIn));
        }

        //fetching for first time
        fetchFunction();

        //'subscription' for first time
        subscribeOnUserfriend(fetchFunction);    
    }, []);
    //fetching data from APPSYNC


    if(allUserfriends === false) {
        return <Loader/>;
    }

    else if(allUserfriends === null) {
        return <Page404/>;
    }

    return (
        <>
            <Head title="MyFriends List"/>

            <div className={`userslistpage ${allUserfriends.length === 0 ? `d-flex justify-content-center align-items-center`: ``}`} id={dark ? "bg1" : "bg2"}>
                {
                    allUserfriends.length === 0 ? (
                        <div className="container d-flex justify-content-center">
                            <div className="alert alert-success p-5 w-75" role="alert">
                                <h4 className="alert-heading">No My Friends Exist!</h4>
                                <p>Oh yeah, you viewed an empty list of My Friends unfortunately becasue there is no Friends have created with you till yet.</p>
                                <hr/>
                                <p className="mb-0">Whenever you need to, be sure to visit this list of My Friends page to keep things know and understand.</p>
                            </div>
                        </div>
                    ) : (
                        <Container fluid>
                            <Row>
                                {
                                    allUserfriends.map(({
                                        id,
                                        name
                                    }) => (            
                                        <Card
                                            key={id}
                                            id={id}
                                            name={name}
                                        />
                                    ))
                                }
                            </Row>
                        </Container>
                    )
                }
            </div>
        </>
    )
}

export default MyfriendslistPage;