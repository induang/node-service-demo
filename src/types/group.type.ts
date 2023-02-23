export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface Group {
	id: string;
	name: string;
	permissions: Array<Permission>;
}

export interface GroupParams {
	name: string;
	permissions: Array<Permission>;
}
