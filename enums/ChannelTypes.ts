export enum ChannelTypes {
   /** Server Text channel */
   guildText = 0,
   /** Direct message */
   dm = 1,
   /** Guild voice channel */ 
   guildVoice = 2,
   /** Group DMs */
   groupDm = 3,
   /** Guild Category */
   guildCategory = 4,
   /** Guild Announcement channel, followable */
   guildAnnouncement = 5,
   /** Announcement thread */
   announcementThread = 10,
   /** Temporary channel within guildText or guildForum */
   publicThread = 11,
   /** Temporary channel within guildText type, viewable by only invited people and those with MANAGE_THREADS permissions */
   privateThread = 12,
   /** Channel for Hosting events */
   guildStageVoice = 13,
   /** Channel in a student hub containing listed servers */
   guildDirectory = 14,
   /** Channel that only can contain threads */
   guildForum = 15,
   /** Channel that only contains threads too, similar to guildForum */
   guildmedia = 16,
}