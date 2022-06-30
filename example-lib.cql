library example

using FHIR version '4.0.1'

context Patient

define "ProcedureRetrieve":
  [Procedure]

define "EncounterRetrieve":
  [Encounter]
