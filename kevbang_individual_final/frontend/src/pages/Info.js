import Kevin from "../images/KevinTran.jpg";

export const Info = () => {
    return(
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
            <h1 style={{ marginBottom: '20px' }}>SE/ComS319 Construction of User Interfaces, Spring 2024</h1>
            <p style={{ marginBottom: '10px'}}> 5/9/2024</p>
            <p style={{ marginBottom: '10px' }}>Kevin Tran - kevbang@iastate.edu</p>
            <p style={{ marginBottom: '10px' }}>Dr. Abraham N. Aldaco Gastelum - Dr. Ali Jannesari</p>
            <p style={{ marginBottom: '10px' }}>aaldaco@iastate.edu - jannesar@iastate.edu</p>
            <img src={Kevin} alt="Kevin Tran" style={{ width: "20%"}}/>
            <p style={{ marginBottom: '10px' }}>About this project: This is a project that was developed by me. I initially wanted to create an interactive portfolio, <br/>
                                                but I realized that it would not fit the scope of the final project. I took a little spin on that idea and decided to create <br/>
                                                a personal recipe e-book for myself. I am very satisfied with it to say the very least. I am really pleased with the minimalistic <br/>
                                                design. I personally struggled with adding the log in feature as it was not something that was covered in class. <br/>
                                                DISCLAIMER: My idea was sparked by some content I stumbled upon online. </p>
</div>
    
    )
}