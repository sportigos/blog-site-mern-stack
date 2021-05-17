//  Begin Date: 2020/05/26  Tue
async function toTreeData(data) {
	var deep = 0, treeData = [];

	for (let i = 0; i < data.length; i++) {
		if (data[i].ancestors.length >= deep) {
			deep = data[i].ancestors.length;
		}
	}
	for (let x = 0; x <= deep; x++) {
		for (let j = 0; j < data.length; j++) {

			if (data[j].ancestors.length === x && x === 0) {
				await treeData.push(data[j]);
			} else if (data[j].ancestors.length === x && x !== 0) {
				let p = 0;
				for (; p < treeData.length; p++) {
					if (String(treeData[p]._id) === String(data[j].parent)) {
						break;
					}
				}
				if (p < treeData.length) {
					await treeData.splice(p + 1, 0, data[j]);
				}
			}
		}
	}
	return treeData;
}

export default toTreeData;