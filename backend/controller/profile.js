const config = require('config');
const request = require('request');
const Profile = require('../model/Profile');
const User = require('../model/User');
const { validationResult } = require('express-validator');
const io = require('../socket');


// @route    GET profile/me
// @desc     Get current users profile
// @access   Private
exports.getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const profile = await Profile.findOne({ user: userId }).populate('user', [
      'name',
      'avatar'
    ]);
    if (!profile) {
      return res.status(400).json({ msg: '沒有此用戶的個人資料' });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
// @route    POST profile/
// @desc     Create or update user profile
// @access   Private
exports.postProfile = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    company,
    website,
    location,
    status,
    about,
    githubusername,
    youtube,
    twitter,
    linkedin,
    medium
  } = req.body;

  const profileCollection = {};

  profileCollection.user = req.user.id;

  //setup profile
  if (website) profileCollection.website = website;
  if (company) profileCollection.company = company;
  if (location) profileCollection.location = location;
  if (status) profileCollection.status = status;
  if (about) profileCollection.about = about;
  if (githubusername) profileCollection.githubusername = githubusername;

  //setup profileSocial
  profileCollection.social = {};
  if (youtube) profileCollection.social.youtube = youtube;
  if (twitter) profileCollection.social.twitter = twitter;
  if (linkedin) profileCollection.social.linkedin = linkedin;
  if (medium) profileCollection.social.medium = medium;
  console.log(profileCollection);
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileCollection },
      { new: true, upsert: true }
    );
    io.getIO().emit('profile', { action: 'create', profile: profile });

    console.log(profile);
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @route    GET profile/
// @desc     Get all profiles
// @access   Public
exports.getProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);

    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @route    GET profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
exports.getProfilebyUserId = async (req, res, next) => {
  try {
    //get userId from request param(query)
    const userId = req.params.user_id;
    const profile = await Profile.findOne({ user: userId }).populate('user', [
      'name',
      'avatar'
    ]);

    if (!profile) {
      return res.status(400).json({ msg: '沒有找到此用戶的資料' });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
exports.delProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    //TODO:Remove user posts
    // await Post.findOneAndRemove({user:userId})
    // Remove profile
    await Profile.findOneAndRemove({ user: userId });

    //Remove user
    await User.findOneAndRemove({ _id: userId });

    res.json({ msg: '已刪除用戶資料' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
// @route    PUT profile/experience
// @desc     Add profile experience
// @access   Private
exports.putExp = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, company, location, from, to, current, description } = req.body;
  const newExp = { title, company, location, from, to, current, description };
  try {
    const userId = req.user.id;
    const profile = await Profile.findOne({ user: userId });

    _putArray(profile.experience, newExp, newExp.current);

    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
// @route    DELETE profile/exp/:exp_id
// @desc     Delete experience from profile
// @access   Private
exports.delExp = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const expId = req.params.exp_id;
    const foundProfile = await Profile.findOne({ user: userId });
    const expIds = foundProfile.experience.map(exp => exp._id.toString());
    const removeIndex = expIds.indexOf(expId);
    if (removeIndex === -1) {
      return res.status(500).json({ msg: 'Server Error' });
    } else {
      foundProfile.experience.splice(removeIndex, 1);
      await foundProfile.save();
      return res.status(200).json(foundProfile);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
exports.putEdu = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { school, degree, major, from, to, current, description } = req.body;
  const newEdu = { school, degree, major, from, to, current, description };
  try {
    const userId = req.user.id;
    const profile = await Profile.findOne({ user: userId });

    _putArray(profile.education, newEdu, newEdu.current);

    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private
exports.delEdu = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const eduId = req.params.edu_id;
    const foundProfile = await Profile.findOne({ user: userId });
    const eduIds = foundProfile.education.map(edu => edu._id.toString());
    const removeIndex = eduIds.indexOf(eduId);
    if (removeIndex === -1) {
      return res.status(500).json({ msg: 'Server Error' });
    } else {
      foundProfile.education.splice(removeIndex, 1);
      await foundProfile.save();
      return res.status(200).json(foundProfile);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @route    PUT profile/certification
// @desc     Add profile certification
// @access   Private
exports.putCer = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { certificationName, getDay, description } = req.body;
  const newCer = { certificationName, getDay, description };
  try {
    const userId = req.user.id;
    const profile = await Profile.findOne({ user: userId });

    profile.certification.unshift(newCer);

    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @route    DELETE profile/certification/:cer_id
// @desc     Delete certification from profile
// @access   Private

exports.delCer = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cerId = req.params.cer_id;
    const foundProfile = await Profile.findOne({ user: userId });
    const cerIds = foundProfile.certification.map(cer => cer._id.toString());
    const removeIndex = cerIds.indexOf(cerId);
    if (removeIndex === -1) {
      return res.status(500).json({ msg: 'Server Error' });
    } else {
      foundProfile.certification.splice(removeIndex, 1);
      await foundProfile.save();
      return res.status(200).json(foundProfile);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @route    PUT profile/other
// @desc     Add profile other
// @access   Private
exports.putOthers = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { otherName, from, to, current, description } = req.body;
  const newOther = { otherName, from, to, current, description };
  try {
    const userId = req.user.id;
    const profile = await Profile.findOne({ user: userId });

    _putArray(profile.others, newOther, newOther.current);

    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
// @route    DELETE profile/other/:other_id
// @desc     Delete other from profile
// @access   Private
exports.delOthers = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const otherId = req.params.other_id;
    const foundProfile = await Profile.findOne({ user: userId });
    const otherIds = foundProfile.others.map(other => other._id.toString());
    const removeIndex = otherIds.indexOf(otherId);
    if (removeIndex === -1) {
      return res.status(500).json({ msg: 'Server Error' });
    } else {
      foundProfile.others.splice(removeIndex, 1);
      await foundProfile.save();
      return res.status(200).json(foundProfile);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
exports.getGithub = async (req, res, next) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };

    request(options, (error, response, body) => {
      if (error) {
        console.log(error);
      }
      if (response.statusCode != 200) {
        return res.status(404).json({ msg: '未找到用戶的 Github 資料' });
      }
      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// @route    PUT profile/skills
// @desc     Add profile skills
// @access   Private/

exports.putSkills = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { category, skill } = req.body;
    const userId = req.user.id;
    const profile = await Profile.findOne({ user: userId });
    let profileSkills = {};
    if (category) profileSkills.category = category;
    if (skill) profileSkills.skill = skill;

    profile.skills.unshift(profileSkills);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// @route    DELETE profile/skills/:skill_id
// @desc     Delete skill from skill
// @access   Private

exports.delSkill = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const foundProfile = await Profile.findOne({ user: userId });
    const skillIds = foundProfile.skills.map(s => s._id.toString());

    const removeIndex = skillIds.indexOf(req.params.skill_id);
    if (removeIndex === -1) {
      return res.status(500).json({ msg: 'Server error' });
    } else {
      foundProfile.skills.splice(removeIndex, 1);
      await foundProfile.save();
      return res.status(200).json(foundProfile);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
};

// @route    PUT profile/userId/skills/:skill_id
// @desc     Certificate skill from skills
// @access   Private

exports.skillCerbyOtherUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const skillId = req.params.skill_id;
    const otherUserId = req.user.id;
    const profile = await Profile.findOne({ user: userId });
    const skill = profile.skills.find(
      skill => skill._id.toString() === skillId
    );
    console.log(skill);
    if (
      skill.certificated.filter(cer => cer.user.toString() === otherUserId)
        .length > 0
    ) {
      return res.status(400).json({ msg: '已經認證此一技術' });
    }

    skill.certificated.unshift({ user: otherUserId });
    await profile.save();
    res.json(profile.skills);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
};

// @route    DELETE profile/skills/:skill_id/:user_id
// @desc     remove certificate skill from skills
// @access   Private

exports.rmCerbyOtherUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const skillId = req.params.skill_id;
    const otherUserId = req.user.id;
    const profile = await Profile.findOne({ user: userId });
    const skill = profile.skills.find(
      skill => skill._id.toString() === skillId
    );
    console.log(skill);
    if (
      skill.certificated.filter(cer => cer.user.toString() === otherUserId)
        .length === 0
    ) {
      return res.status(400).json({ msg: '還沒認證過此技術' });
    }

    const removeIndex = skill.certificated
      .map(like => like.user.toString())
      .indexOf(otherUserId);
    skill.certificated.splice(removeIndex, 1);
    await profile.save();
    res.json(profile.skills);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
};

// @route    PUT /profile/user_id/friendrequest
// @desc     send friend request
// @access   Private

exports.sendFriendRequest = async (req, res, next) => {
  try {
    // console.log(req.params.user_id);
    // console.log(req.user.id);
    const userId = req.params.user_id;
    const sender = req.user.id;

    //get receiver info
    const user = await User.findById(userId);

    //get sender(requester) info
    const senderData = await User.findById(sender).select(['name', 'avatar']);

    // put sender(requester) info on receiver pendingfriend collection
    user.pendingfriends.unshift({
      pendingData: {
        id: sender,
        name: senderData.name,
        avatar: senderData.avatar
      }
    });

    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
};

// TODO:change sorting algorithm to insertion sort, that is faster than other sorting algorithm in the world,
// espically, the array is the almost sorted and size is small. so that why i decided use
// insertion sort for sort this.
const _putArray = (arr, newthing, current = false) => {
  // make input arr in order, base is "to"
  // if current is true or arr that haven't any element
  // then we add newthing to the front of this arr
  if (current || arr.length === 0) {
    arr.unshift(newthing);
  }
  // else loop through this arr, compare newthing.to
  else {
    for (let i = 0; i < arr.length; i += 1) {
      const arrNewTo = newthing.to.split('/');
      const newTo = new Date(arrNewTo[0], arrNewTo[1], arrNewTo[2]);
      console.log(newTo >= arr[i].to);
      // if the date of "to" of newthing is greater than the date of "to" of the current index of arr
      if (newTo >= arr[i].to) {
        // than we insert into that index
        arr.splice(i, 0, newthing);
        break;
      }
      //if the date of "to" of newthing is most smaller of whole array then we push to the bottom
      if (i === arr.length) {
        arr.push(newthing);
        break;
      }
    }
  }
};
