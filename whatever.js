// var w = ;
// here we can rais an error and see this error in the consolelog; it has to be on the first
// line! we are getting this on the terminal:
// function (exports, require, module, __filename, __dirname)
// this function actually is who the code down get executes \this is the module wrapper
// function

console.log(__filename + " this is the file name")
console.log(__dirname + " this is the dir name")

function whatever(){
	console.log('this is the whatever functions')

}


module.exports = whatever;