import jwt from "jsonwebtoken";


export const loginController = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: "Missing credentials" });
    }

    const userFromDb = {
        id: 7,
        email: "avramy.kunin@gmail.com",
        password: "1234", 
    };

    if (
        email !== userFromDb.email ||
        password !== userFromDb.password
    ) {
        return res.status(401).json({ message: "Invalid credentials" });

    }
    const token = jwt.sign(
        {
            userId: userFromDb.id,
            email: userFromDb.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.status(200).json({
        message: "Login successful",
        token,
    });
}

