import AWS from 'aws-sdk'

AWS.config.update({
    region: "us-east-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "AKIA3XBALMIRFNCZ3LWN",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "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"
})

const db = new AWS.DynamoDB.DocumentClient()

const Table = 'Peliculas'

export {
    db,
    Table
}