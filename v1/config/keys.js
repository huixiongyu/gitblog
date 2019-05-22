module.exports = {
    mongoURI:  process.env.NODE_ENV === 'production' ? 
        'mongodb://127.0.0.1:27017/gitblog' : 
        'mongodb+srv://<name>:<password>@cluster0-sd5cp.gcp.mongodb.net/test?retryWrites=true',
    secretOrKey: 'hxskey'
}