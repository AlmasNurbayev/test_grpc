
import {Server, loadPackageDefinition, ServerCredentials, credentials } from '@grpc/grpc-js';
import {loadSync} from  '@grpc/proto-loader';
//import asd from '../proto/test.proto';


function main() {

  const definition = loadSync('./proto/test.proto');
  const testingProto = loadPackageDefinition(definition);

  const testingStub = new testingProto.testingService('0.0.0.0:50051',
  credentials.createInsecure());

  testingStub.getTest({ id: "zz_test_id" }, (err, recipe) => {
    console.log('Found a recipe:');
    console.log(recipe);
    console.log('ending');

});


}

main();