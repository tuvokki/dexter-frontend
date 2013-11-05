// list of banned IPs
var banned = [
'127.0.0.1',
'10.0.0.14'
];

// middleware enabled or not
var enabled = true;

// the middleware function
module.exports = function(onoff) {
    
    enabled = (onoff == 'on') ? true : false;
    
    return function(req, res, next) {
        if (enabled && banned.indexOf(req.connection.remoteAddress) <= -1) {
            console.log("Banned! { banned: true, ip: " + req.connection.remoteAddress + " }");
            res.end('Banned');
        }
        else { next(); }
    }
    
};