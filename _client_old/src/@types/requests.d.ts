interface GetSyncUser {
  data: Session | null;
  isLoading: boolean;
  refresh: (key: string | undefined) => Promise<unknown>;
}

interface GetConfigInfo {
  data: Configuration | null;
  isLoading: boolean;
  refresh: (key: string | undefined) => Promise<unknown>;
}

interface GetModulesList {
  data: Array<Module> | null;
  isLoading: boolean;
  refresh: (key: string | undefined) => Promise<unknown>;
}

interface Module {
  id: number;
  title: string;
  description: string;
  position: number;
  functionalities: {
    id: number;
    slug: string;
    title: string;
    icon: string | null;
    position: number;
    moduleId: number;
    permissions: {
      id: number;
      canRead: boolean;
      canCreate: boolean;
      canUpdate: boolean;
      canDelete: boolean;
      type: string;
    };
  }[];
}

interface PostUploadFile {
  id: number;
  size: string;
  width: string;
  height: string;
  newName: string;
  mimeType: string;
  originalName: string;
  filePath: string;
}
