const admin = require('firebase-admin')
const db = admin.firestore()

const getCollection = async (Collection) => {
  let list = await db
    .collection(Collection)
    .get()
  list = list.docs.map(_doc => {
      let data = _doc.data();
      data['id'] = _doc.id;
      return data;
    });
  return list;
}

const addToCollection = async (newObj, Collection) => {
  const status = await db
    .collection(Collection)
    .add(newObj)
  return status
}

module.exports = ({getCollection, addToCollection})