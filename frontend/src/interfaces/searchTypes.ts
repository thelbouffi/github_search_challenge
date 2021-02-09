/* eslint-disable @typescript-eslint/no-explicit-any */
export const GET_DATA = 'GET_DATA';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';

export interface SearchData {
  success: boolean;
  results: {
    status: number;
    url: string;
    headers: any;
    data: {
      total_count: number;
      incomplete_results: boolean;
      items: Array<UserItem>;
    };
  };
}

export interface UserItem {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  score: number;
}

export interface RepoItem {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: UserItem | any;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  forks_count: number;
  mirror_url: null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: any;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
  score: number;
}

export interface SearchError {
  success: boolean;
  results: any;
}

export interface SearchState {
  data: SearchData | null;
  loading: boolean;
  error: string;
}

interface GetDataAction {
  type: typeof GET_DATA;
  payload: SearchData;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

interface ClearDataAction {
  type: typeof CLEAR_SEARCH;
  payload: null;
}

export type SearchAction =
  | GetDataAction
  | SetLoadingAction
  | SetErrorAction
  | ClearDataAction
  | any;
