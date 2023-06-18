
const AboutUser = ({ userData }) => {
    return (
        <h4 className='title'>Welcome {userData && userData?.name.toUpperCase()}</h4>
    )
}

export default AboutUser;