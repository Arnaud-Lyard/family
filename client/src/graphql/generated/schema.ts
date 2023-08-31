import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from '@vue/composition-api';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Article = {
  __typename?: 'Article';
  content: Scalars['String'];
  id: Scalars['Float'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: Scalars['String'];
  logout: Scalars['String'];
  promoteUser: UserInformations;
  register: UserLoggedIn;
};


export type MutationLoginArgs = {
  data: UserLoginInputDto;
};


export type MutationPromoteUserArgs = {
  data: PromoteUserInputDto;
};


export type MutationRegisterArgs = {
  data: UserRegisterInputDto;
};

export type PromoteUserInputDto = {
  id: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  articles: Array<Article>;
  getAllAdminUsers: Array<UserAdminList>;
  personnalInformations: UserInformations;
  profile: UserLoggedIn;
};

export type UserAdminList = {
  __typename?: 'UserAdminList';
  id: Scalars['Float'];
  role: Scalars['String'];
  username: Scalars['String'];
};

export type UserInformations = {
  __typename?: 'UserInformations';
  email: Scalars['String'];
  id: Scalars['Float'];
  username: Scalars['String'];
};

export type UserLoggedIn = {
  __typename?: 'UserLoggedIn';
  role: Scalars['String'];
  username: Scalars['String'];
};

export type UserLoginInputDto = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserRegisterInputDto = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type GetAllAdminUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAdminUsersQuery = { __typename?: 'Query', getAllAdminUsers: Array<{ __typename?: 'UserAdminList', id: number, username: string, role: string }> };

export type LoginMutationVariables = Exact<{
  data: UserLoginInputDto;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type PersonnalInformationsQueryVariables = Exact<{ [key: string]: never; }>;


export type PersonnalInformationsQuery = { __typename?: 'Query', personnalInformations: { __typename?: 'UserInformations', username: string, email: string } };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'UserLoggedIn', username: string, role: string } };

export type PromoteUserMutationVariables = Exact<{
  data: PromoteUserInputDto;
}>;


export type PromoteUserMutation = { __typename?: 'Mutation', promoteUser: { __typename?: 'UserInformations', username: string } };

export type RegisterMutationVariables = Exact<{
  data: UserRegisterInputDto;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserLoggedIn', username: string } };


export const GetAllAdminUsersDocument = gql`
    query getAllAdminUsers {
  getAllAdminUsers {
    id
    username
    role
  }
}
    `;

/**
 * __useGetAllAdminUsersQuery__
 *
 * To run a query within a Vue component, call `useGetAllAdminUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAdminUsersQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetAllAdminUsersQuery();
 */
export function useGetAllAdminUsersQuery(options: VueApolloComposable.UseQueryOptions<GetAllAdminUsersQuery, GetAllAdminUsersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetAllAdminUsersQuery, GetAllAdminUsersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetAllAdminUsersQuery, GetAllAdminUsersQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetAllAdminUsersQuery, GetAllAdminUsersQueryVariables>(GetAllAdminUsersDocument, {}, options);
}
export function useGetAllAdminUsersLazyQuery(options: VueApolloComposable.UseQueryOptions<GetAllAdminUsersQuery, GetAllAdminUsersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetAllAdminUsersQuery, GetAllAdminUsersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetAllAdminUsersQuery, GetAllAdminUsersQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetAllAdminUsersQuery, GetAllAdminUsersQueryVariables>(GetAllAdminUsersDocument, {}, options);
}
export type GetAllAdminUsersQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetAllAdminUsersQuery, GetAllAdminUsersQueryVariables>;
export const LoginDocument = gql`
    mutation Login($data: UserLoginInputDto!) {
  login(data: $data)
}
    `;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLoginMutation({
 *   variables: {
 *     data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(options: VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLogoutMutation();
 */
export function useLogoutMutation(options: VueApolloComposable.UseMutationOptions<LogoutMutation, LogoutMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LogoutMutation, LogoutMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
}
export type LogoutMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LogoutMutation, LogoutMutationVariables>;
export const PersonnalInformationsDocument = gql`
    query PersonnalInformations {
  personnalInformations {
    username
    email
  }
}
    `;

/**
 * __usePersonnalInformationsQuery__
 *
 * To run a query within a Vue component, call `usePersonnalInformationsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonnalInformationsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = usePersonnalInformationsQuery();
 */
export function usePersonnalInformationsQuery(options: VueApolloComposable.UseQueryOptions<PersonnalInformationsQuery, PersonnalInformationsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<PersonnalInformationsQuery, PersonnalInformationsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<PersonnalInformationsQuery, PersonnalInformationsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<PersonnalInformationsQuery, PersonnalInformationsQueryVariables>(PersonnalInformationsDocument, {}, options);
}
export function usePersonnalInformationsLazyQuery(options: VueApolloComposable.UseQueryOptions<PersonnalInformationsQuery, PersonnalInformationsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<PersonnalInformationsQuery, PersonnalInformationsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<PersonnalInformationsQuery, PersonnalInformationsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<PersonnalInformationsQuery, PersonnalInformationsQueryVariables>(PersonnalInformationsDocument, {}, options);
}
export type PersonnalInformationsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<PersonnalInformationsQuery, PersonnalInformationsQueryVariables>;
export const ProfileDocument = gql`
    query Profile {
  profile {
    username
    role
  }
}
    `;

/**
 * __useProfileQuery__
 *
 * To run a query within a Vue component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useProfileQuery();
 */
export function useProfileQuery(options: VueApolloComposable.UseQueryOptions<ProfileQuery, ProfileQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ProfileQuery, ProfileQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ProfileQuery, ProfileQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, {}, options);
}
export function useProfileLazyQuery(options: VueApolloComposable.UseQueryOptions<ProfileQuery, ProfileQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ProfileQuery, ProfileQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ProfileQuery, ProfileQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, {}, options);
}
export type ProfileQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<ProfileQuery, ProfileQueryVariables>;
export const PromoteUserDocument = gql`
    mutation PromoteUser($data: PromoteUserInputDto!) {
  promoteUser(data: $data) {
    username
  }
}
    `;

/**
 * __usePromoteUserMutation__
 *
 * To run a mutation, you first call `usePromoteUserMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `usePromoteUserMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = usePromoteUserMutation({
 *   variables: {
 *     data: // value for 'data'
 *   },
 * });
 */
export function usePromoteUserMutation(options: VueApolloComposable.UseMutationOptions<PromoteUserMutation, PromoteUserMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<PromoteUserMutation, PromoteUserMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<PromoteUserMutation, PromoteUserMutationVariables>(PromoteUserDocument, options);
}
export type PromoteUserMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<PromoteUserMutation, PromoteUserMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($data: UserRegisterInputDto!) {
  register(data: $data) {
    username
  }
}
    `;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRegisterMutation({
 *   variables: {
 *     data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(options: VueApolloComposable.UseMutationOptions<RegisterMutation, RegisterMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RegisterMutation, RegisterMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
}
export type RegisterMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RegisterMutation, RegisterMutationVariables>;