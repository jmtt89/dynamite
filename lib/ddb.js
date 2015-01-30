var AWS = require('aws-sdk');

module.exports = {
	Model: function(json,collection){
		this._collection = this.constructor.name;
		this._db = new AWS.DynamoDB();


		//Construye el objeto
		var keys = Object.keys(json);
		for(var i=keys.length-1,key=null;i>=0;i--){
			key=keys[i];
			this[key]=json[key];
		};

		//Funciones Privadas
		function parseToDynamo(model){
			var keys 	= Object.keys(model),
					obj 	= Array.isArray(model) ? [] : {};

			for(var i=keys.length-1,key=null;i>=0;i--){
				key=keys[i];
				if(key[0] == '_'){
					//No hacer nada
				}else if(this[key] instanceOf Number){
					obj[key] = {'N':this[key]}
				}else if(this[key] instanceOf String){
					obj[key] = {'S':this[key]}
				}else if(this[key] instanceOf Boolean){
					obj[key] = {'BOOL':this[key]}
				}else if(Array.isArray(this[key])){
					obj[key] = parseToDynamo(this[key]);
				}else if(this[key] instanceOf Object){
					obj[key] = obj[key]parseToDynamo(this[key]);
				}
			}
			return obj;
		}



		// Metodos Publicos
		this.toJson = function(){
			return JSON.stringify(this);;
		};
		this.toDynamo = function(){
			return parseToDynamo(this);
		};

		/*
		* Obtien el elemento que haga match
		* con el id del objeto 
		* el unico elemento debe ser el id del objeto
		*/
		this.get = function(callback){
			db.getItem({
				TableName : this._collection, 
				Key 			: this.toDynamo()
			}, callback );
		}

		/*
		* Crea un nuevo objeto
		*/
		this.post = function(callback){
			db.putItem({
				TableName : this._collection, 
				Item 			: this.toDynamo()
			}, callback );
		}

		/*
		* Actualiza o Sobreescribe un objeto existente
		*/
		this.put = function(callback){
			db.putItem({
				TableName : this._collection, 
				Item 			: this.toDynamo()
			}, callback );
		}

		//TODO

		/*
		* Elimina un objeto de la base de datos
		*/
		this.delete = function(callback){

		}

		/*
		* Permite hacer querys complejos de ser necesarios
		* el lenguaje de query debe ser el mismo que el de DynamoDB.
		* Solo Busca en PrimaryKey e Indices
		*/
		this.query = function(query,callback){

		}

		/*
		* Permite hacer querys complejos de ser necesarios
		* el lenguaje de query debe ser el mismo que el de DynamoDB.
		* Busca en todos los documentos de la colleccion
		*/
		this.scan = function(query,callback){

		}

		//END TODO
	},
	Credentials : function(json){
		AWS.config.credentials = new AWS.CognitoIdentityCredentials({
			AccountId 		: json.AccountId,
			IdentityPoolId: json.IdentityPoolId,
			RoleArn  			: json.RoleArn,
			Logins 				: json.Logins
		});
		AWS.config.region = json.region;

		this.get = function(callback){
			AWS.config.credentials.get(callback);
		}
	},
	test: function() {
		return 1;
	}
};