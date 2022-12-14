const getUID = (data: { id?: number; key?: string }) => data.id ?? data.key;

export default getUID;
