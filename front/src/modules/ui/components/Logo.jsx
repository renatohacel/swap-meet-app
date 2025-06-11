
const Logo = ({ className, ...props }) => {
    return (
        <img src={'/src/assets/tianguis_logo_clean.svg'} {...props} alt="Tianguis Logo" className={className} />
    )
}

export default Logo