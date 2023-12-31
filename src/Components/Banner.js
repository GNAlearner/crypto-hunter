import React from 'react'
import { Container, Typography, makeStyles } from '@material-ui/core';
import Carousel from './Carousel';

const useStyles = makeStyles(() => ({
    banner: {
        backgroundImage: "url(./banner2.jpg)",
    },
    bannnerContent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 15,
        justifyContent: "space-around",
    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    }
}));

const Banner = () => {

    const classes = useStyles();

    return (
        <div className={classes.banner}
        >
            <Container className={classes.bannnerContent}>
                <div className={classes.tagline}>
                    <Typography
                        variant="h2"
                        style={{
                            fontWeight: "bold",
                            marginBottom: 15,
                            fontFamily: "Montserrat",
                        }}>
                        Crypto Hunter
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        style={{
                            color: "darkgrey",
                            textTransform: "capitalize",
                            fontFamily: "Montserrat",
                        }}>
                        Get all the info regarding your favourite Crypto Currency
                    </Typography>
                </div>
                <Carousel />
            </Container>
        </div>
    )
}

export default Banner;