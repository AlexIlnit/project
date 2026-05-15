import Institution from "../models/Institution.js";
export const getAllInstitutions = async () => {
  console.log("📦 repository called");
  return Institution.find();
};

export async function getAllInstitutions() {
  return Institution.find();
}

export async function createInstitution(data) {
  return Institution.create(data);
}

export async function updateInstitution(id, data) {
  return Institution.findByIdAndUpdate(id, data, { returnDocument: "after" });
}

export async function deleteInstitution(id) {
  return Institution.findByIdAndDelete(id);
}