const express = require('express');
const router = express.Router();
const auth = require('../../middleware/isAuth');
const profileController = require('../../controller/profile.js');

// @route    GET profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, profileController.getProfile);

// @route    POST profile
// @desc     Create or update user profile
// @access   Private
router.post('/', auth, profileController.postProfile);

// @route    GET profile
// @desc     Get all profiles
// @access   Public
router.get('/', profileController.getProfiles);

// @route    GET profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:user_id', profileController.getProfilebyUserId);

// @route    DELETE profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', auth, profileController.delProfile);

// @route    PUT profile/experience
// @desc     Add profile experience
// @access   Private
router.put('/experience', auth, profileController.putExp);

// @route    DELETE profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private
router.delete('/experience/:exp_id', auth, profileController.delExp);

// @route    PUT profile/education
// @desc     Add profile education
// @access   Private
router.put('/education', auth, profileController.putEdu);

// @route    DELETE profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private
router.delete('/education/:edu_id', auth, profileController.delEdu);

// @route    PUT profile/certification
// @desc     Add profile certification
// @access   Private
router.put('/certification', auth, profileController.putCer);

// @route    DELETE profile/certification/:cer_id
// @desc     Delete certification from profile
// @access   Private
router.delete('/certification/:cer_id', auth, profileController.delCer);

// @route    GET profile/github/:username
// @desc     Get user repos from Github
// @access   Public
router.get('/github/:username', profileController.getGithub);

// @route    PUT profile/others
// @desc     Add profile other
// @access   Private
router.put('/others', auth, profileController.putOthers);

// @route    DELETE profile/others/:other_id
// @desc     Delete other from profile
// @access   Private
router.delete('/others/:other_id', auth, profileController.delOthers);

//TODO: skill
// @route    PUT profile/skills
// @desc     Add profile skills
// @access   Private/
router.put('/skills', auth, profileController.putSkills);

// @route    DELETE profile/skills/:skill_id
// @desc     Delete skill from skill
// @access   Private

router.delete('/skills/:skill_id', auth, profileController.delSkill);

// @route    PUT profile/skills/:skill_id/:user_id
// @desc     Certificate skill from skills
// @access   Private

router.put(
  '/:userId/skills/:skill_id',
  auth,
  profileController.skillCerbyOtherUser
);

// @route    DELETE profile/skills/:skill_id/:user_id
// @desc     remove certificate skill from skills
// @access   Private

router.delete(
  '/:userId/skills/:skill_id',
  auth,
  profileController.rmCerbyOtherUser
);

module.exports = router;
