import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import mainStyles from '../../assets/styles/mainStyles';
import SubHeader from '../../components/subHeader';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList, AppStackScreenProps, RootStackParamList } from '../../navigation/navigationTypes';
import profileStyles from '../../assets/styles/profileStyles';
import { icons } from '../../constants/Icon';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import TextInputComponent from '../../components/textInputComponent';
import PrimaryButton from '../../components/primaryButton';
import BottomModal from '../../components/bottomModal';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showToast } from '../../components/toastMessage';
import { updateProfile } from '../../services/profileService';
import { useAuth } from '../../customHooks/useAuth';


// Define form values type
type FormValues = {
  name: string;
  mobileNo?: string;
  email?: string;
  dob?: string;
  profileImage?: any;
};

// Create Yup schema with only "name" as required
const schema = Yup.object().shape({
  name: Yup.string().required('First Name is required'),
  mobileNo: Yup.string(), // optional
  email: Yup.string().email('Invalid email'),
  dob: Yup.string(),
  profileImage: Yup.mixed().nullable(),
});

const EditProfile:React.FC<AppStackScreenProps<"EditProfile">> = ({ navigation }) => {
  const {userInfo,setUserInfo}=useAuth()
  const [isImagePickerModalVisible, setIsImagePickerModalVisible] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const[isLoading,setIsLoading]=useState<boolean>(false)
  const [dobDisplay, setDobDisplay] = useState('');
  const [dobServer, setDobServer] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [serverProfileImage, setServerProfileImage] = useState('');
  const [displayProfileImage, setDisplayProfileImage] = useState('');
 const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: userInfo?.name,
      mobileNo:'+91 ' + userInfo?.mobile_no,
      email: '',
      dob: '',
      profileImage: userInfo?.profile_pic, 
    },
  });

  // Handler for form submission
  const onSubmit = async(data: FormValues) => {     
    setIsLoading(true)
   const formData=new FormData();
   formData.append('name',data.name)      
   formData.append('email',data.email)
   formData.append('dob',data.dob)
   formData.append('mobile_no',data.mobileNo)
   if (profileImage !== '') {
   let document_file = {
      uri: profileImage,
      type: 'image/jpeg',
      name: 'document.jpg',
    };
    formData.append('profile_pic', document_file);
  }
try{
   const {success,message,updatedData}=await updateProfile(formData)
   if(success){
    showToast('success', message||'Profile Updated Successfully!');
    await AsyncStorage.setItem('userInfo', JSON.stringify(updatedData));
    setUserInfo(updatedData)
    setServerProfileImage(updatedData.profile_pic)
    await AsyncStorage.setItem('profileImage', updatedData.profile_pic);
   
    navigation.navigate('BottomNav')
   }
   else{
    showToast('error', message||'Failed to  updated profile !');
   }
  }
  catch(error:unknown){
    if(error instanceof Error)
    showToast('error', error.message||'Failed to  updated profile !');

  }
  finally{
    setIsLoading(false)
  }

  };
  

  const toggleImagePickerModalVisible=()=>{
    setIsImagePickerModalVisible(!isImagePickerModalVisible)
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      // Prevent default behavior of going back
      e.preventDefault();

      // Navigate explicitly to 'My Lorry'
      navigation.navigate('ProfileScreen');
    });

    return unsubscribe;
  }, [navigation]);

  const toggleDatePicker = () => {
    Keyboard.dismiss()
    setShowDatePicker(!showDatePicker);
};

  const formatDate = (rawDate, type:string) => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    if (type === 'display') {
        return `${day}-${month}-${year}`;
    } else {
        return `${year}-${month}-${day}`;
    }
};

 useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []); 


  const handleImageSelection = (imageUri) => {
    setValue('profileImage', imageUri); // Set image in react-hook-form
    setProfileImage(imageUri); // Maintain local state for display
  };
  return (
    <KeyboardAvoidingView
    style={[mainStyles.container]}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    // keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
  >
      <SubHeader
        title={'Account'}
        onPress={() => navigation.navigate('ProfileScreen')}
        style={undefined}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContainer(keyboardVisible)}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            profileStyles.menuContainer,
            mainStyles.secondaryBorderColor,
            mainStyles.secondaryBackgroundColor,
            { paddingHorizontal: scale(0) },
          ]}
        >
          

<Controller
  control={control}
  name="profileImage"
  render={({ field: { value, onChange } }) => (
    <>
      <Pressable
        style={[
          mainStyles.iconBackgroundColor,
          mainStyles.contentCenter,
          {
            alignSelf: 'center',
            width: moderateScale(70, 0.6),
            height: moderateVerticalScale(70, 0.4),
            borderRadius: moderateScale(50),
          },
        ]}
        onPress={() => setIsImagePickerModalVisible(true)}
      >
        {value ? (
          <Image
            source={{ uri: value }}
            style={{
              width: moderateScale(65, 0.6),
              height: moderateVerticalScale(65, 0.4),
              borderRadius: moderateScale(50),
              resizeMode: 'cover',
            }}
          />
        ) : (
          <Image
            source={icons.userIcon}
            style={{ width: scale(35), height: verticalScale(35) }}
          />
        )}
      </Pressable>

      {/* Image Picker Modal */}
      <BottomModal
        isModalVisible={isImagePickerModalVisible}
        toggleModal={toggleImagePickerModalVisible}
        type={'imageUpload'}
        profileImage={profileImage}
        setProfileImage={handleImageSelection} // Pass hook form's setter
        serverProfileImage={serverProfileImage}
        setDisplayProfileImage={setDisplayProfileImage}
      />
    </>
  )}
/>

          {/* Edit Form */}
          <View style={{ marginTop: verticalScale(12) }}>
            {/* Name Field (Required) */}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputComponent
                  value={value}
                  label={'First Name'}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Enter your name"
                  error={errors.name?.message}
                  required={true}
                />
              
              )}
            />
            {/* Phone Field (Optional) */}
            <Controller
              control={control}
              name="mobileNo"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputComponent
                  value={value}
                  label={'Phone'}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Enter your phone"
                  error={errors.mobileNo?.message}
                  required={false}
                  style={mainStyles.iconBackgroundColor}
                />
              )}
            />
            {/* Email Field (Optional) */}
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputComponent
                  value={value}
                  label={'Email'}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Enter your email"
                  error={errors.email?.message}
                  required={false}
                />
              )}
            />
             {/* DOB Field with Date Picker */}
             <Controller
  control={control}
  name="dob"
  render={({ field: { onChange, value } }) => (
    <>
      <Pressable onPress={toggleDatePicker}>
        <TextInputComponent
          label={'Date Of Birth'}
          placeholder="Select your DOB"
          value={dobDisplay}
          editable={false} // Prevent keyboard input
          required={false}
        />
      </Pressable>

      {showDatePicker && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()} // Convert to Date object
          mode="date"
          display={'default'}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              const formattedDate = formatDate(selectedDate, 'server');
              setDobDisplay(formatDate(selectedDate, 'display'));
              setDobServer(formattedDate);
              onChange(formattedDate); // Update react-hook-form
            }
          }}
        />
      )}
    </>
  )}
/>
          </View>
        </View>
        {/* Save Button */}
       
      </ScrollView>
      <PrimaryButton
          title={'SAVE'}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
          style={styles.saveButton}
        />
        
    </KeyboardAvoidingView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  scrollContainer: (keyboardVisible: boolean) => ({
    paddingBottom: keyboardVisible ? verticalScale(180) : verticalScale(50),
  }),
  saveButton: {
    position: 'relative',
    bottom:verticalScale(10),
    // marginTop: verticalScale(20),
    width: '90%',
    alignSelf: 'center',
  },
});


