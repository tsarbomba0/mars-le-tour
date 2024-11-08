/**
 * Collection of utility types for requests to the REST api.
 */

export type userPatchRequest = {
    /** Username to be set */
    username: string,
    /** Filepath to the image file to be used as avatar */
    avatar: string,
    /** Filepath to the image file to be used as banner */
    banner: string
}