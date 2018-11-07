const fs = require('fs');

Parse.Cloud.define("ImageUpload", function(request, response) {
	console.log("hii")
	// console.log(request.params);
	image(request.params.upload,request.params.objectId);
	// upload image url to serve
});

function image(data,id) {
	var dir = __dirname + '/images/' + id
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
	if(data && data.length > 0){
		for(var i=0; i < data.length; i++){
			let new_name = new Date().getTime();
			fs.writeFileSync(dir+ '/img_'+new_name+'.png', data[i], {encoding: 'base64'}, function(err) {
				console.log('File created');
				// res.send('File Uploaded')
			});
		}
	}
}

Parse.Cloud.define("LocalJSON", function(request, response) {
	console.log("hi sandeep")
	var obj = JSON.parse(fs.readFileSync('./cloud/local.json', 'utf8'));
	return obj;
});