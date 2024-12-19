import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!); // Make sure MONGO_URI is defined
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Mongo DB connected successfully");
        });

        connection.on('error', (err) => {
            console.log("Mongo db connection error: " + err);
            process.exit(1); // Exit with a non-zero code to indicate failure
        });
    } catch (error) {
        console.log('Something went wrong during connection.');
        console.log(error);
        process.exit(1); // Exit with a non-zero code
    }
}
