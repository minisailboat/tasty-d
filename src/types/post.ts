export interface PostEventData<T> {
	id: number
	num: T
}

export interface CreateParam {
	content: string
	medias?: Array<string>
	parentId: number
	state: number
	type: string
}

export interface PostPageResult {
	chatNum: number
	content: string
	createTime: string
	creator: {
		account: string
		avatar: string
		id: number
		permissions: []
		roles: []
		sex: number
		state: number
		username: string
	}
	heartNum: number
	id: number
	parentId: number
	sortValue: number
	starNum: number
	type: string
	updateTime: string
}
