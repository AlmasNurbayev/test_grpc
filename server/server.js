
import {Server, loadPackageDefinition, ServerCredentials } from '@grpc/grpc-js';
import {loadSync} from  '@grpc/proto-loader';
//import asd from '../proto/test.proto';

function getTest(call, callback) {
  console.log(call.request);
  let recipe = {knumber: String(call.request.id)};
  if(recipe) {
      callback(null, recipe);
  }
  else {
      callback({
          message: 'Recipe not found',
          code: grpc.status.INVALID_ARGUMENT
      });
  }
}


function main() {

  const definition = loadSync('./proto/test.proto');
  const testingProto = loadPackageDefinition(definition);

  const server = new Server();
  server.addService(testingProto.testingService.service,
                         {  getTest: getTest}
    );
  server.bindAsync('0.0.0.0:50051', ServerCredentials.createInsecure(), (error, port) => {
    console.log(`listening on port ${port}`);
    server.start();
  });
}

main();