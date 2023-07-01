import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";



type EagerStaffs = {
  readonly id?: number | null;
  readonly name?: string | null;
  readonly email?: string | null;
}

type LazyStaffs = {
  readonly id?: number | null;
  readonly name?: string | null;
  readonly email?: string | null;
}

export declare type Staffs = LazyLoading extends LazyLoadingDisabled ? EagerStaffs : LazyStaffs

export declare const Staffs: (new (init: ModelInit<Staffs>) => Staffs)

type EagerStudents = {
  readonly id?: number | null;
  readonly name?: string | null;
  readonly email?: string | null;
}

type LazyStudents = {
  readonly id?: number | null;
  readonly name?: string | null;
  readonly email?: string | null;
}

export declare type Students = LazyLoading extends LazyLoadingDisabled ? EagerStudents : LazyStudents

export declare const Students: (new (init: ModelInit<Students>) => Students)

type EagerLabs = {
  readonly id?: string | null;
  readonly name?: string | null;
  readonly students?: Students | null;
  readonly staffs?: Staffs | null;
}

type LazyLabs = {
  readonly id?: string | null;
  readonly name?: string | null;
  readonly students?: Students | null;
  readonly staffs?: Staffs | null;
}

export declare type Labs = LazyLoading extends LazyLoadingDisabled ? EagerLabs : LazyLabs

export declare const Labs: (new (init: ModelInit<Labs>) => Labs)

type EagerWorkspace = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Workspace, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly labs?: Labs | null;
  readonly color?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyWorkspace = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Workspace, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly labs?: Labs | null;
  readonly color?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Workspace = LazyLoading extends LazyLoadingDisabled ? EagerWorkspace : LazyWorkspace

export declare const Workspace: (new (init: ModelInit<Workspace>) => Workspace) & {
  copyOf(source: Workspace, mutator: (draft: MutableModel<Workspace>) => MutableModel<Workspace> | void): Workspace;
}