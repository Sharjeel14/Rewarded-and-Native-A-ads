import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button,
} from 'react-native';
import admob, {
  MaxAdContentRating,
  InterstitialAd,
  InterstitialAdType,
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
  BannerAd,
  TestIds,
  BannerAdSize,
  AdMobRewarded,
} from '@react-native-firebase/admob';

const adUnitId3 = __DEV__
  ? TestIds.REWARDED
  : 'ca-app-pub-8844441377786347/9712698987';


const rewarded = RewardedAd.createForAdRequest(adUnitId3, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

function RewardAd() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const eventListener = rewarded.onAdEvent((type, error, reward) => {
      if (type === RewardedAdEventType.LOADED) {
        setLoaded(true);
      }

      if (type === RewardedAdEventType.EARNED_REWARD) {
        console.log('User earned reward of ', reward);
      }
    });

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      eventListener();
    };
  }, []);

  // No advert ready to show yet
  if (!loaded) {
    return null;
  }

  return (
    <Button
      title="Show Rewarded Ad"
      onPress={() => {
        rewarded.show();
      }}
    />
  );
}




export default class App extends Component {
  clickEventListener() {
    Alert.alert('Success', 'Product has been added to cart');
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    admob()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,

        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,
      })
      .then(() => {
        // Request config successfully set!
      });
  }

  render() {
    return (
      <View style={styles.container}>

        <ScrollView>
          <View style={{alignItems: 'center', marginHorizontal: 30}}>
            <Image
              style={styles.productImg}
              source={{
                uri:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3v7KDJN7TAoJa5sFaPWcp1HX8JFcpF3z5K3ngz4L6kWoEP7Ca',
              }}
            />
          
          
          
            {/* Calling Reward Ads Function */}
           
           <RewardAd />
           
            <Text style={styles.name}>Super Soft T-Shirt</Text>
            <Text style={styles.price}>$ 12.22</Text>

            

            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec quam felis, ultricies nec
            </Text>
            {/* <Button title='Show Interstitial Ad' onPress ={()=> showInterstitialAd}/> */}
          </View>
          <View style={styles.starContainer}>
            <Image
              style={styles.star}
              source={{uri: 'https://img.icons8.com/color/40/000000/star.png'}}
            />
            <Image
              style={styles.star}
              source={{uri: 'https://img.icons8.com/color/40/000000/star.png'}}
            />
            <Image
              style={styles.star}
              source={{uri: 'https://img.icons8.com/color/40/000000/star.png'}}
            />
            <Image
              style={styles.star}
              source={{uri: 'https://img.icons8.com/color/40/000000/star.png'}}
            />
            <Image
              style={styles.star}
              source={{uri: 'https://img.icons8.com/color/40/000000/star.png'}}
            />
          </View>
          <View style={styles.contentColors}>
            <TouchableOpacity
              style={[
                styles.btnColor,
                {backgroundColor: '#00BFFF'},
              ]}></TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btnColor,
                {backgroundColor: '#FF1493'},
              ]}></TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btnColor,
                {backgroundColor: '#00CED1'},
              ]}></TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btnColor,
                {backgroundColor: '#228B22'},
              ]}></TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btnColor,
                {backgroundColor: '#20B2AA'},
              ]}></TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btnColor,
                {backgroundColor: '#FF4500'},
              ]}></TouchableOpacity>
          </View>

          <View style={styles.separator}></View>
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  productImg: {
    width: 200,
    height: 200,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: 'bold',
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
    color: '#696969',
  },
  star: {
    width: 40,
    height: 40,
  },
  btnColor: {
    height: 30,
    width: 30,
    borderRadius: 30,
    marginHorizontal: 3,
  },
  btnSize: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderColor: '#778899',
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: 'white',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starContainer: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20,
  },
  contentColors: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20,
  },
  contentSize: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20,
  },
  separator: {
    height: 2,
    backgroundColor: '#eeeeee',
    marginTop: 20,
    marginHorizontal: 30,
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  addToCarContainer: {
    marginHorizontal: 30,
  },
});
