export interface IPoll {
  _id: string;
  _rev: string;
  title: string;
  type: string;
  desc: string;
  gid: string;
  open: boolean;
  uri: string;
  due: Date;
  oids: {};

  // "vids",
  // "oids",
  // "options",
}
