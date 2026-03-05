export default function error(status, msg) {
  //create new error object
  let err = new Error(msg);
  // add status to object
  err.status = status;

  //return error
  return err;
}
