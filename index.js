const cql = require("cql-execution");
const { AsyncPatientSource } = require("cql-exec-fhir");

const elm = require("./example-lib.json");

// This patient exists on the HAPI reference server
const HAPI_PATIENT_IDS = ["numer-EXM130"];

const lib = new cql.Library(elm);
const executor = new cql.Executor(lib);

// We provide a FHIR server URL so that findRecords can make FHIR queries for our loaded patients
const psource = AsyncPatientSource.FHIRv401("http://hapi.fhir.org/baseR4");

// We only load strings as the IDs of the patient resources instead of full bundles
psource.loadPatientIds(HAPI_PATIENT_IDS);

executor
  .exec(psource)
  .then((result) => {
    // Results will have the Patient resource from the server as well as associated resources that reference that patient
    console.log(JSON.stringify(result, undefined, 2));
  })
  .catch((err) => {
    console.error(err);
  });
