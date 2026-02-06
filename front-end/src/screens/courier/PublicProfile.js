
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  ActivityIndicator,
 
} from 'react-native';
import {  
   Star, 
  MessageCircle,
  
} from 'lucide-react-native';

  import  useCourierProfile  from '../../hooks/useCourierProfile';
  import { useEffect,useState } from 'react';
  
 
  export default function PublicProfile(props) {
    const courierId = props.route?.params?.courierId || '2';
    const { fetchPublicProfile } = useCourierProfile();
    const [driver, setDriver] = useState({});
    const [loading, setLoading] = useState(true); 
     useEffect(() => {
   (async () => {
   try {
      const profile = await fetchPublicProfile(courierId);
      setDriver(profile);
      setLoading(false);
   } catch (error) {
      console.error("Error fetching public profile:", error);
      setLoading(true);
    } 
   })();
  }, [courierId]);
    
    const handleSendMessage = () => {
      Alert.alert('Fonctionalité à venir');
    };
 const [reviews] = useState([
    {
      id: '1',
      author: 'Fatima M.',
      rating: 5,
      comment:
        'Livreur très professionnel et courtois. Livraison rapide et discrète.',
      date: 'Il y a 2 jours',
    },
    {
      id: '2',
      author: 'Mohamed K.',
      rating: 5,
      comment:
        'Parfait! Arrivé avant l\'heure prévue. Vivement recommandé!',
      date: 'Il y a 4 jours',
    },
    {
      id: '3',
      author: 'Soufiane A.',
      rating: 4,
      comment:
        'Très bien. Un petit délai mais la communication était excellente.',
      date: 'Il y a 1 semaine',
    },
  ]);
  const renderReviewCard = (review) => (
    <View key={review.id} style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewAuthor}>
          <View style={styles.authorAvatar}>
            <Text style={styles.avatarText}>
              {review.author.charAt(0)}
            </Text>
          </View>
          <View>
            <Text style={styles.reviewAuthorName}>
              {review.author}
            </Text>
            <Text style={styles.reviewDate}>{review.date}</Text>
          </View>
        </View>
        <View style={styles.reviewRating}>
          {renderStars(review.rating)}
        </View>
      </View>
      <Text style={styles.reviewComment}>{review.comment}</Text>
    </View>
  );
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          color={i < Math.floor(rating) ? '#FFB347' : '#E0E0E0'}
          fill={i < Math.floor(rating) ? '#FFB347' : 'none'}
        />
      );
    }
    return stars;
  };

    return (
       <>
        {loading? (
          <ActivityIndicator size="large" color="#da9c3f" style={styles.loadingIndicator} />
        ):
        <View style={styles.container}>      
       
        <View style={styles.headerSpacer} />
          
   

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.profileImageContainer}>
              <View style={styles.profileImage}>
                <Image
                  source={require('../../../assets/livreur.png')}
                  style={styles.profileImage}
                />
              </View>              
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.driverName}>{driver.name || "Binta"}</Text>
              <View style={styles.ratingContainer}>
                <View style={styles.starsContainer}>
                  <Text style={styles.starText}>4.5</Text>
                </View>
                <Text style={styles.ratingText}>
                  {2} / 5
                </Text>
                <Text style={styles.reviewsCount}>
                  ({3} avis)
                </Text>
              </View>
              <View style={styles.transportInfo}>
                <Text style={styles.transportType}>
                  {driver.transportType} • {driver.vehicleRegistration}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.actionButtons}>
            
            <TouchableOpacity
              style={[styles.actionButton, styles.messageButton]}
              onPress={handleSendMessage}
            >
              <MessageCircle size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Contacter</Text>
            </TouchableOpacity>
          </View>
        </View>

        

        {driver.vehicleImages && (
          <View style={styles.vehicleSection}>
            <Text style={styles.sectionTitle}>
              Photos du véhicule
            </Text>
            <FlatList
              data={driver.vehicleImages}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: "data:image/png;base64,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" }}
                  style={styles.vehicleImage}
                />
              )}
              keyExtractor={(_, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.vehicleList}
            />
          </View>
        )}

        <View style={styles.reviewsSection}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.sectionTitle}>Avis Récents</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllLink}>Voir tous</Text>
            </TouchableOpacity>
          </View>

          {reviews.map((review) => renderReviewCard(review))}
        </View>        
      </ScrollView>

     </View>
      }
        

       </>
  );        
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FF9955',
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSpacer: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF9955',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 2,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  driverName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF9955',
  },
  reviewsCount: {
    fontSize: 12,
    color: '#999',
  },
  transportInfo: {
    marginTop: 4,
  },
  transportType: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FF9955',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  messageButton: {
    backgroundColor: '#4ECDC4',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  statsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statIconContainer: {
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  vehicleSection: {
    marginBottom: 20,
  },
  vehicleList: {
    gap: 12,
  },
  vehicleImage: {
    width: 200,
    height: 120,
    borderRadius: 12,
  },
  reviewsSection: {
    marginBottom: 20,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllLink: {
    color: '#FF9955',
    fontWeight: '700',
    fontSize: 14,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reviewAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF0E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF9955',
  },
  reviewAuthorName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  reviewRating: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewComment: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  orderButton: {
    backgroundColor: '#FF9955',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  orderButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
