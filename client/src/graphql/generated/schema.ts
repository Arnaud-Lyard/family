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
  user: User;
};

export type GetArticleInputDto = {
  id: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: Scalars['String'];
  logout: Scalars['String'];
  promoteUser: UserInformations;
  register: UserLoggedIn;
  saveArticle: Article;
  updateArticle: Article;
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


export type MutationSaveArticleArgs = {
  data: SaveArticleInputDto;
};


export type MutationUpdateArticleArgs = {
  data: UpdateArticleInputDto;
};

export type PromoteUserInputDto = {
  id: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  articles: Array<Article>;
  getAdminArticles: Array<Article>;
  getAllAdminUsers: Array<UserAdminList>;
  getAllArticles: Array<Article>;
  getArticleByIdForAdmin: Article;
  personnalInformations: UserInformations;
  profile: UserLoggedIn;
};


export type QueryGetArticleByIdForAdminArgs = {
  data: GetArticleInputDto;
};

export type SaveArticleInputDto = {
  content: Scalars['String'];
  title: Scalars['String'];
};

export type UpdateArticleInputDto = {
  content: Scalars['String'];
  id: Scalars['Float'];
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  articles: Array<Article>;
  email: Scalars['String'];
  id: Scalars['Float'];
  role: Scalars['String'];
  username: Scalars['String'];
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

export type GetAdminArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdminArticlesQuery = { __typename?: 'Query', getAdminArticles: Array<{ __typename?: 'Article', id: number, title: string, content: string }> };

export type GetAllArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllArticlesQuery = { __typename?: 'Query', getAllArticles: Array<{ __typename?: 'Article', id: number, title: string, content: string, user: { __typename?: 'User', username: string } }> };

export type GetAllAdminUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAdminUsersQuery = { __typename?: 'Query', getAllAdminUsers: Array<{ __typename?: 'UserAdminList', id: number, username: string, role: string }> };

export type GetArticleByIdForAdminQueryVariables = Exact<{
  data: GetArticleInputDto;
}>;


export type GetArticleByIdForAdminQuery = { __typename?: 'Query', getArticleByIdForAdmin: { __typename?: 'Article', id: number, title: string, content: string } };

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

export type SaveArticleMutationVariables = Exact<{
  data: SaveArticleInputDto;
}>;


export type SaveArticleMutation = { __typename?: 'Mutation', saveArticle: { __typename?: 'Article', title: string, content: string } };

export type UpdateArticleMutationVariables = Exact<{
  data: UpdateArticleInputDto;
}>;


export type UpdateArticleMutation = { __typename?: 'Mutation', updateArticle: { __typename?: 'Article', id: number, title: string, content: string } };


export const GetAdminArticlesDocument = gql`
    query GetAdminArticles {
  getAdminArticles {
    id
    title
    content
  }
}
    `;

/**
 * __useGetAdminArticlesQuery__
 *
 * To run a query within a Vue component, call `useGetAdminArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdminArticlesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetAdminArticlesQuery();
 */
export function useGetAdminArticlesQuery(options: VueApolloComposable.UseQueryOptions<GetAdminArticlesQuery, GetAdminArticlesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetAdminArticlesQuery, GetAdminArticlesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetAdminArticlesQuery, GetAdminArticlesQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetAdminArticlesQuery, GetAdminArticlesQueryVariables>(GetAdminArticlesDocument, {}, options);
}
export function useGetAdminArticlesLazyQuery(options: VueApolloComposable.UseQueryOptions<GetAdminArticlesQuery, GetAdminArticlesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetAdminArticlesQuery, GetAdminArticlesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetAdminArticlesQuery, GetAdminArticlesQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetAdminArticlesQuery, GetAdminArticlesQueryVariables>(GetAdminArticlesDocument, {}, options);
}
export type GetAdminArticlesQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetAdminArticlesQuery, GetAdminArticlesQueryVariables>;
export const GetAllArticlesDocument = gql`
    query GetAllArticles {
  getAllArticles {
    id
    title
    content
    user {
      username
    }
  }
}
    `;

/**
 * __useGetAllArticlesQuery__
 *
 * To run a query within a Vue component, call `useGetAllArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllArticlesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetAllArticlesQuery();
 */
export function useGetAllArticlesQuery(options: VueApolloComposable.UseQueryOptions<GetAllArticlesQuery, GetAllArticlesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetAllArticlesQuery, GetAllArticlesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetAllArticlesQuery, GetAllArticlesQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetAllArticlesQuery, GetAllArticlesQueryVariables>(GetAllArticlesDocument, {}, options);
}
export function useGetAllArticlesLazyQuery(options: VueApolloComposable.UseQueryOptions<GetAllArticlesQuery, GetAllArticlesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetAllArticlesQuery, GetAllArticlesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetAllArticlesQuery, GetAllArticlesQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetAllArticlesQuery, GetAllArticlesQueryVariables>(GetAllArticlesDocument, {}, options);
}
export type GetAllArticlesQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetAllArticlesQuery, GetAllArticlesQueryVariables>;
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
export const GetArticleByIdForAdminDocument = gql`
    query GetArticleByIdForAdmin($data: GetArticleInputDto!) {
  getArticleByIdForAdmin(data: $data) {
    id
    title
    content
  }
}
    `;

/**
 * __useGetArticleByIdForAdminQuery__
 *
 * To run a query within a Vue component, call `useGetArticleByIdForAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticleByIdForAdminQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetArticleByIdForAdminQuery({
 *   data: // value for 'data'
 * });
 */
export function useGetArticleByIdForAdminQuery(variables: GetArticleByIdForAdminQueryVariables | VueCompositionApi.Ref<GetArticleByIdForAdminQueryVariables> | ReactiveFunction<GetArticleByIdForAdminQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetArticleByIdForAdminQuery, GetArticleByIdForAdminQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetArticleByIdForAdminQuery, GetArticleByIdForAdminQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetArticleByIdForAdminQuery, GetArticleByIdForAdminQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetArticleByIdForAdminQuery, GetArticleByIdForAdminQueryVariables>(GetArticleByIdForAdminDocument, variables, options);
}
export function useGetArticleByIdForAdminLazyQuery(variables: GetArticleByIdForAdminQueryVariables | VueCompositionApi.Ref<GetArticleByIdForAdminQueryVariables> | ReactiveFunction<GetArticleByIdForAdminQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetArticleByIdForAdminQuery, GetArticleByIdForAdminQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetArticleByIdForAdminQuery, GetArticleByIdForAdminQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetArticleByIdForAdminQuery, GetArticleByIdForAdminQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetArticleByIdForAdminQuery, GetArticleByIdForAdminQueryVariables>(GetArticleByIdForAdminDocument, variables, options);
}
export type GetArticleByIdForAdminQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetArticleByIdForAdminQuery, GetArticleByIdForAdminQueryVariables>;
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
export const SaveArticleDocument = gql`
    mutation SaveArticle($data: SaveArticleInputDto!) {
  saveArticle(data: $data) {
    title
    content
  }
}
    `;

/**
 * __useSaveArticleMutation__
 *
 * To run a mutation, you first call `useSaveArticleMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSaveArticleMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSaveArticleMutation({
 *   variables: {
 *     data: // value for 'data'
 *   },
 * });
 */
export function useSaveArticleMutation(options: VueApolloComposable.UseMutationOptions<SaveArticleMutation, SaveArticleMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<SaveArticleMutation, SaveArticleMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<SaveArticleMutation, SaveArticleMutationVariables>(SaveArticleDocument, options);
}
export type SaveArticleMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<SaveArticleMutation, SaveArticleMutationVariables>;
export const UpdateArticleDocument = gql`
    mutation UpdateArticle($data: UpdateArticleInputDto!) {
  updateArticle(data: $data) {
    id
    title
    content
  }
}
    `;

/**
 * __useUpdateArticleMutation__
 *
 * To run a mutation, you first call `useUpdateArticleMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateArticleMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateArticleMutation({
 *   variables: {
 *     data: // value for 'data'
 *   },
 * });
 */
export function useUpdateArticleMutation(options: VueApolloComposable.UseMutationOptions<UpdateArticleMutation, UpdateArticleMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateArticleMutation, UpdateArticleMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UpdateArticleMutation, UpdateArticleMutationVariables>(UpdateArticleDocument, options);
}
export type UpdateArticleMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateArticleMutation, UpdateArticleMutationVariables>;