// app.json (Expo config)
{
  "expo": {
    "name": "Gen Dial Up",
    "slug": "gen-dial-up",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#FAF8F3"
    },
    "ios": {
      "supportsTabletMode": true,
      "bundleIdentifier": "com.gendialup.app"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FAF8F3"
      },
      "package": "com.gendialup.app"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      [
        "expo-image-picker",
        {
          "photosPermission": "Allow $(PRODUCT_NAME) to access your photos.",
          "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera."
        }
      ],
      [
        "expo-notifications",
        {
          "icon": "./assets/notification-icon.png",
          "color": "#9CAF88"
        }
      ],
      [
        "expo-camera",
        {
          "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera."
        }
      ],
      "expo-location"
    ]
  }
}

// ============================================================================
// FILE: app/_layout.tsx
// Root layout with navigation setup
// ============================================================================
import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { supabase } from '@/lib/supabase-client';
import { useAuth } from '@/hooks/useAuth';

import WelcomeScreen from './welcome';
import OnboardingScreen from './onboarding';
import MatchesScreen from './matches';
import MatchDetailsScreen from './matches/[id]';
import ChatScreen from './chat/[id]';
import VenuesScreen from './venues';
import ProfileScreen from './profile';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator (Post-Auth)
function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#D4CECC30',
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 4,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: -2,
        },
        tabBarActiveTintColor: '#9CAF88',
        tabBarInactiveTintColor: '#5C5652',
      }}
    >
      <Tab.Screen
        name="matches"
        component={MatchesScreen}
        options={{
          title: 'Matches',
          tabBarIcon: ({ color }) => (
            <Heart size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="chat"
        component={ChatScreen}
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => (
            <MessageCircle size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="venues"
        component={VenuesScreen}
        options={{
          title: 'Venues',
          tabBarIcon: ({ color }) => (
            <MapPin size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <User size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'inter-regular': require('@/assets/fonts/inter-regular.ttf'),
    'inter-bold': require('@/assets/fonts/inter-bold.ttf'),
    'inter-600': require('@/assets/fonts/inter-600.ttf'),
  });

  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (fontsLoaded && !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isLoading]);

  if (!fontsLoaded || isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#FAF8F3' },
        }}
      >
        {!user ? (
          // Pre-Auth Stack
          <>
            <Stack.Screen name="welcome" component={WelcomeScreen} />
            <Stack.Screen name="onboarding" component={OnboardingScreen} />
          </>
        ) : (
          // Post-Auth Stack
          <>
            <Stack.Screen name="app" component={AppTabs} />
            <Stack.Screen
              name="matchDetails"
              component={MatchDetailsScreen}
              options={{
                animationEnabled: true,
                presentation: 'card',
              }}
            />
            <Stack.Screen
              name="meetupPlanning"
              component={MeetupPlanningScreen}
              options={{
                animationEnabled: true,
                presentation: 'modal',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ============================================================================
// FILE: app/welcome.tsx
// Welcome screen
// ============================================================================
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, styles as sharedStyles } from '@/theme';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={[sharedStyles.container, { backgroundColor: COLORS.cream }]}>
      <View style={{ paddingTop: 60, paddingHorizontal: 20 }}>
        <Text style={[sharedStyles.title, { fontSize: 48, marginBottom: 12 }]}>
          Gen Dial Up
        </Text>
        <Text style={[sharedStyles.subtitle, { marginBottom: 40, fontSize: 18 }]}>
          Find your people.{'\n'}Locally.
        </Text>

        {/* Feature Grid */}
        <View style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 48 }}>
          {[
            { icon: '✓', label: 'Quality Matches' },
            { icon: '🔒', label: 'Verified Users' },
            { icon: '📍', label: 'Local Venues' },
            { icon: '❤️', label: 'Platonic Only' },
          ].map((feature, i) => (
            <View
              key={i}
              style={{
                backgroundColor: COLORS.white,
                padding: 16,
                borderRadius: 12,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <Text style={{ fontSize: 20, marginBottom: 6 }}>{feature.icon}</Text>
              <Text style={[sharedStyles.caption, { fontSize: 13 }]}>
                {feature.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Buttons */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 40 }}>
        <TouchableOpacity
          style={[sharedStyles.button, { backgroundColor: COLORS.sage }]}
          onPress={() => navigation.navigate('onboarding')}
        >
          <Text style={[sharedStyles.buttonText, { color: COLORS.white }]}>
            Get Started
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            sharedStyles.button,
            {
              backgroundColor: 'transparent',
              borderWidth: 2,
              borderColor: COLORS.sage,
            },
          ]}
        >
          <Text style={[sharedStyles.buttonText, { color: COLORS.sage }]}>
            Log In
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// ============================================================================
// FILE: app/onboarding.tsx
// Multi-step onboarding
// ============================================================================
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, styles as sharedStyles } from '@/theme';

const SLIDES = [
  {
    title: 'Moved to a new city?',
    description: 'Building friendships as an adult is hard. We get it.',
    emoji: '🏙️',
  },
  {
    title: 'Work from home?',
    description: 'Miss serendipitous connections with colleagues.',
    emoji: '💻',
  },
  {
    title: 'Curated matches',
    description: 'Max 3 per week. Quality over quantity, always.',
    emoji: '✨',
  },
];

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const [step, setStep] = useState(0);
  const progressAnim = new Animated.Value(step / SLIDES.length);

  const handleNext = () => {
    if (step < SLIDES.length - 1) {
      setStep(step + 1);
      Animated.timing(progressAnim, {
        toValue: (step + 1) / SLIDES.length,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      navigation.navigate('matches'); // Assuming user is already authenticated
    }
  };

  const currentSlide = SLIDES[step];

  return (
    <ScrollView
      style={[sharedStyles.container, { backgroundColor: COLORS.cream }]}
      scrollEnabled={false}
    >
      {/* Progress Bar */}
      <View style={{ marginTop: 60, marginHorizontal: 20, marginBottom: 60 }}>
        <View
          style={{
            height: 4,
            backgroundColor: `${COLORS.taupe}20`,
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <Animated.View
            style={{
              height: '100%',
              backgroundColor: COLORS.sage,
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            }}
          />
        </View>
      </View>

      {/* Slide Content */}
      <View style={{ alignItems: 'center', paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 64, marginBottom: 24 }}>
          {currentSlide.emoji}
        </Text>

        <Text style={[sharedStyles.title, { fontSize: 28, marginBottom: 16 }]}>
          {currentSlide.title}
        </Text>

        <Text
          style={[
            sharedStyles.subtitle,
            {
              textAlign: 'center',
              maxWidth: 300,
              marginBottom: 60,
              fontSize: 16,
            },
          ]}
        >
          {currentSlide.description}
        </Text>
      </View>

      {/* Dots */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 8,
          marginBottom: 32,
        }}
      >
        {SLIDES.map((_, i) => (
          <View
            key={i}
            style={{
              width: i === step ? 24 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: i === step ? COLORS.sage : `${COLORS.taupe}40`,
            }}
          />
        ))}
      </View>

      {/* Button */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 40 }}>
        <TouchableOpacity
          style={[sharedStyles.button, { backgroundColor: COLORS.sage }]}
          onPress={handleNext}
        >
          <Text style={[sharedStyles.buttonText, { color: COLORS.white }]}>
            {step === SLIDES.length - 1 ? 'Continue to Profile' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// ============================================================================
// FILE: app/matches/index.tsx
// Matches screen (swipeable cards)
// ============================================================================
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  PanResponder,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Heart, ChevronRight, MapPin, Check } from 'lucide-react-native';
import { useMatches } from '@/hooks/useMatches';
import { COLORS, styles as sharedStyles } from '@/theme';

export default function MatchesScreen() {
  const navigation = useNavigation();
  const { matches, interested } = useMatches();
  const [currentIndex, setCurrentIndex] = useState(0);
  const pan = new Animated.ValueXY();

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > 100) {
        // Swiped right (interested)
        handleInterested();
      } else if (gesture.dx < -100) {
        // Swiped left (maybe later)
        handleMaybeLater();
      } else {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const handleInterested = async () => {
    await interested.mutate(matches[currentIndex].id);
    Animated.timing(pan, {
      toValue: { x: 500, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setCurrentIndex(currentIndex + 1);
      pan.setValue({ x: 0, y: 0 });
    });
  };

  const handleMaybeLater = () => {
    Animated.timing(pan, {
      toValue: { x: -500, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setCurrentIndex(currentIndex + 1);
      pan.setValue({ x: 0, y: 0 });
    });
  };

  if (!matches || currentIndex >= matches.length) {
    return (
      <View style={[sharedStyles.container, { justifyContent: 'center' }]}>
        <Text style={[sharedStyles.title, { textAlign: 'center' }]}>
          📅
        </Text>
        <Text style={[sharedStyles.title, { textAlign: 'center', marginBottom: 12 }]}>
          Your matches arrive weekly
        </Text>
        <Text style={[sharedStyles.subtitle, { textAlign: 'center' }]}>
          Check back next Sunday for fresh connections.
        </Text>
      </View>
    );
  }

  const match = matches[currentIndex];

  return (
    <View style={[sharedStyles.container, { paddingBottom: 20 }]}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingTop: 12,
          marginBottom: 32,
        }}
      >
        <Text style={[sharedStyles.title, { fontSize: 20 }]}>Your Matches</Text>
        <View
          style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            backgroundColor: `${COLORS.taupe}15`,
            borderRadius: 20,
          }}
        >
          <Text style={[sharedStyles.caption, { fontSize: 12 }]}>
            {currentIndex + 1} of {matches.length}
          </Text>
        </View>
      </View>

      {/* Match Card */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
          { marginHorizontal: 20, marginBottom: 24 },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.95}
          onPress={() =>
            navigation.navigate('matchDetails', { matchId: match.id })
          }
        >
          {/* Image */}
          <Image
            source={{ uri: match.image }}
            style={{
              width: '100%',
              aspectRatio: 1,
              borderRadius: 16,
              marginBottom: 16,
            }}
          />

          {/* Info */}
          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 16,
              padding: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.12,
              shadowRadius: 16,
              elevation: 3,
            }}
          >
            {/* Name & Distance */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: 8,
              }}
            >
              <Text style={[sharedStyles.title, { fontSize: 20 }]}>
                {match.name}, {match.age}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <MapPin size={14} color={COLORS.lightText} />
                <Text style={[sharedStyles.caption, { fontSize: 13 }]}>
                  {match.distance} mi
                </Text>
              </View>
            </View>

            {/* Bio */}
            <Text
              style={[sharedStyles.subtitle, { marginBottom: 12, fontSize: 14 }]}
            >
              {match.bio}
            </Text>

            {/* Shared Interest */}
            {match.sharedInterests.length > 0 && (
              <View
                style={{
                  backgroundColor: `${COLORS.sage}20`,
                  paddingVertical: 10,
                  paddingHorizontal: 12,
                  borderRadius: 8,
                  marginBottom: 12,
                }}
              >
                <Text style={{ color: COLORS.sage, fontWeight: '600', fontSize: 13 }}>
                  ✓ You both love {match.sharedInterests[0]}
                </Text>
              </View>
            )}

            {/* Interest Pills */}
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 8,
                marginBottom: 16,
              }}
            >
              {match.interests.slice(0, 3).map((interest, i) => (
                <View
                  key={i}
                  style={{
                    backgroundColor: `${COLORS.taupe}15`,
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    borderRadius: 20,
                  }}
                >
                  <Text style={[sharedStyles.caption, { fontSize: 12 }]}>
                    {interest}
                  </Text>
                </View>
              ))}
            </View>

            {/* Buttons */}
            <View
              style={{
                flexDirection: 'row',
                gap: 12,
              }}
            >
              <TouchableOpacity
                onPress={handleMaybeLater}
                style={[
                  sharedStyles.button,
                  {
                    flex: 1,
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderColor: COLORS.warmGray,
                  },
                ]}
              >
                <Text style={[sharedStyles.buttonText, { color: COLORS.lightText }]}>
                  Maybe Later
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleInterested}
                style={[
                  sharedStyles.button,
                  {
                    flex: 1,
                    backgroundColor: COLORS.sage,
                  },
                ]}
              >
                <Text style={[sharedStyles.buttonText, { color: COLORS.white }]}>
                  Interested ♥
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

// ============================================================================
// FILE: lib/supabase-client.ts
// Supabase client setup
// ============================================================================
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// ============================================================================
// FILE: hooks/useAuth.ts
// Authentication hook
// ============================================================================
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/lib/supabase-client';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    return () => authListener?.subscription.unsubscribe();
  }, [setUser]);

  return { user, isLoading };
}

// ============================================================================
// FILE: hooks/useMatches.ts
// Matches hook with React Query
// ============================================================================
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase-client';

export function useMatches() {
  const { data: matches = [], isLoading, error } = useQuery({
    queryKey: ['matches'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('matches')
        .select('*')
        .or(`user_a_id.eq.${user?.id},user_b_id.eq.${user?.id}`)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const interested = useMutation({
    mutationFn: async (matchId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase
        .from('matches')
        .update({
          user_a_interested: user?.id === matches[0].user_a_id ? true : false,
          status: 'mutual',
        })
        .eq('id', matchId);

      if (error) throw error;
    },
  });

  return { matches, isLoading, error, interested };
}

// ============================================================================
// FILE: store/authStore.ts
// Auth state management with Zustand
// ============================================================================
import { create } from 'zustand';
import type { User } from '@supabase/supabase-js';

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

// ============================================================================
// FILE: theme/index.ts
// Shared theme constants
// ============================================================================
import { StyleSheet } from 'react-native';

export const COLORS = {
  cream: '#FAF8F3',
  taupe: '#8B8680',
  warmGray: '#D4CECC',
  sage: '#9CAF88',
  coral: '#D97F6F',
  white: '#FFFFFF',
  darkText: '#2C2622',
  lightText: '#5C5652',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.darkText,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.lightText,
    lineHeight: 24,
  },
  caption: {
    fontSize: 13,
    color: COLORS.lightText,
    fontWeight: '500',
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});

// ============================================================================
// FILE: package.json (key dependencies)
// ============================================================================
{
  "dependencies": {
    "react": "^18.2.0",
    "react-native": "^0.73.0",
    "expo": "^50.0.0",
    "expo-router": "^2.0.0",
    "@react-navigation/native": "^6.1.0",
    "@react-navigation/bottom-tabs": "^6.5.0",
    "@react-navigation/native-stack": "^6.9.0",
    "react-native-gesture-handler": "^2.14.0",
    "react-native-reanimated": "^3.5.0",
    "@supabase/supabase-js": "^2.38.0",
    "@tanstack/react-query": "^5.0.0",
    "zustand": "^4.4.0",
    "expo-image-picker": "^14.0.0",
    "expo-camera": "^13.0.0",
    "expo-location": "^16.0.0",
    "expo-notifications": "^0.21.0",
    "react-native-maps": "^1.7.0",
    "@react-native-async-storage/async-storage": "^1.21.0",
    "lucide-react-native": "^0.263.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-native": "^0.73.0",
    "typescript": "^5.3.0"
  }
}

// ============================================================================
// FILE: app/chat/[id].tsx (Placeholder for detailed chat screen)
// ============================================================================
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useChat } from '@/hooks/useChat';
import { Send } from 'lucide-react-native';
import { COLORS, styles as sharedStyles } from '@/theme';

export default function ChatScreen() {
  const route = useRoute();
  const { matchId } = route.params as { matchId: string };
  const { messages, sendMessage } = useChat(matchId);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim()) {
      await sendMessage.mutate(input);
      setInput('');
    }
  };

  return (
    <SafeAreaView style={[sharedStyles.container, { paddingBottom: 0 }]}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: item.isUser ? 'flex-end' : 'flex-start',
              paddingHorizontal: 20,
              marginVertical: 8,
            }}
          >
            <View
              style={{
                maxWidth: '80%',
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 16,
                backgroundColor: item.isUser ? COLORS.sage : `${COLORS.taupe}15`,
              }}
            >
              <Text
                style={{
                  color: item.isUser ? COLORS.white : COLORS.darkText,
                  fontSize: 15,
                }}
              >
                {item.text}
              </Text>
            </View>
          </View>
        )}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          padding: 16,
          borderTopWidth: 1,
          borderTopColor: `${COLORS.warmGray}30`,
          backgroundColor: COLORS.white,
        }}
      >
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Your message..."
            style={{
              flex: 1,
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 24,
              borderWidth: 1,
              borderColor: COLORS.warmGray,
              fontSize: 15,
            }}
          />
          <TouchableOpacity
            onPress={handleSend}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: COLORS.sage,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Send size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ============================================================================
// Setup Instructions
// ============================================================================

/*
1. Initialize Expo Project:
   npx create-expo-app gen-dial-up
   cd gen-dial-up

2. Install Dependencies:
   npm install @react-navigation/native @react-navigation/bottom-tabs
   npm install @supabase/supabase-js @tanstack/react-query zustand
   npm install expo-location expo-image-picker expo-camera expo-notifications
   npm install lucide-react-native

3. Environment Variables (.env):
   EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=xxxxx

4. Test on Device/Emulator:
   npx expo start
   - Scan QR code or press 'i' (iOS) / 'a' (Android)

5. Build for Production:
   eas build --platform all
   eas submit --platform all

Notes:
- All navigation is handled by Expo Router + @react-navigation
- Gestures handled by react-native-gesture-handler
- Real-time updates via Supabase Realtime
- Push notifications via Expo Notifications
*/
