
import crypto from 'crypto';

// Generate a random string for the secret key
function generateRandomString(length) {
    return crypto.randomBytes(length).toString('hex');
}

const secret = generateRandomString(32)


// const secret = "bezkoder-secret-key"

export default secret
